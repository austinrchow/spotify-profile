import React, { useState, useEffect } from "react";
import styled from "styled-components";
import spotifyWebApi from "../spotify.js";
import { longStackSupport } from "q";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  display: flex;
  background-color: #181818;
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

const UserContainer = styled.div`
  margin-left: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #181818;

  height: 100%;
  width: 100vw;
`;

const UserImageCropper = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin: 100px 0 30px 0;
`;

const UserImage = styled.img`
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
`;

const UserDisplayName = styled.div`
  color: white;
  font-size: 40px;
  font-weight: 600;
  &:hover,
  &:focus {
    color: #1db954;
  }
`;

const Logout = styled.div`
  margin-top: 20px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid white;
  border-radius: 20px;
  padding: 7px 30px 7px 30px;
  &:hover,
  &:focus {
    background-color: #1db954;
    color: white;
    border: 1px solid #1db954;
  }
`;

const TrackAndArtistContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  margin-top: 50px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  align-items: left;
`;

const TrackDisplay = styled.li`
  display: flex;
  flex-direction: row;
  align-items: left;
  margin-bottom: 4vh;
  width: 100%
  :hover .img-top {
    display: inline;
  }
`;

const TrackImg = styled.img`
  height: 70px;
  width: 70px;
  margin: 0 20px 0 0;
  padding: 0;
`;

// child of track display
const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

// child of track display
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-left: 2vw;
`;

const SubHeader = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 700;
`;

function logout() {
  //   console.log(window.localStorage);
  // window.localStorage.removeItem("spotify_token_timestamp");
  // window.localStorage.removeItem("spotify_access_token");
  // window.localStorage.removeItem("spotify_refresh_token");
  window.location.reload();
}

const TrackList = (props) => {
  const tracks = props.tracks;
  const trackItems = tracks.map((track) => (
    <TrackDisplay key={track.id}>
      <div className="card">
        <TrackImg src={track.album.images[0].url} />
        {/* <MdPlay fontSize="45px" color="white" className="img-top" /> */}
      </div>

      <TrackInfo>
        <div>{track.name}</div>
        <div style={{ color: "grey" }}>{track.artists[0].name}</div>
      </TrackInfo>
    </TrackDisplay>
  ));

  return <ul>{trackItems}</ul>;
};

const ArtistList = (props) => {
  const artists = props.artists;
  const artistItems = artists.map((artist) => (
    <TrackDisplay key={artist.id}>
      <div className="card">
        <TrackImg src={artist.images[0].url} />
      </div>

      <TrackInfo>
        <div>{artist.name}</div>
      </TrackInfo>
    </TrackDisplay>
  ));

  return <ul>{artistItems}</ul>;
};
const User = () => {
  const [displayName, setDisplayName] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    spotifyWebApi
      .getMe() // note that we don't pass a user id
      .then(
        function (data) {
          console.log("User Information", data);
          setDisplayName(data.display_name);
          setDisplayImage(data.images[0].url);
        },
        function (err) {
          console.error(err);
        }
      );

    spotifyWebApi
      .getMyTopTracks({ limit: 10, time_range: "long_term" })
      .then(function (data) {
        return data.items.map(function (t) {
          return t.id;
        });
      })
      .then(function (trackIds) {
        return spotifyWebApi.getTracks([], {
          ids: trackIds,
          market: "from_token",
        });
      })
      .then(function (tracksInfo) {
        setTracks(tracksInfo.tracks);
      })
      .catch(function (error) {
        console.error(error);
      });

    spotifyWebApi
      .getMyTopArtists({ limit: 10, time_range: "long_term" })
      .then(function (data) {
        console.log(data);
        return data.items;
      })
      .then(function (artistsInfo) {
        setArtists(artistsInfo);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <UserContainer>
        <UserImageCropper>
          <UserImage src={displayImage} />
        </UserImageCropper>
        <UserDisplayName> {displayName} </UserDisplayName>
        <Logout onClick={() => logout()}>LOGOUT</Logout>

        <TrackAndArtistContainer>
          <ListContainer>
            <Header>
              <SubHeader>Top Tracks of All Time</SubHeader>

              <NavLink to="/tracks" class="more">
                SEE MORE
              </NavLink>
            </Header>

            <TrackList tracks={tracks} />
          </ListContainer>
          <ListContainer>
            <Header>
              <SubHeader>Top Artists of All Time</SubHeader>

              <NavLink to="/artists" class="more">
                SEE MORE
              </NavLink>
            </Header>
            <ArtistList artists={artists} />
          </ListContainer>
        </TrackAndArtistContainer>
      </UserContainer>
    </Container>
  );
};

export default User;
