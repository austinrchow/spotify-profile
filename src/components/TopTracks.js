import React, { useState, useEffect } from "react";
import styled from "styled-components";
import spotifyWebApi from "../spotify.js";

const Container = styled.div`
  display: flex;
  background-color: #181818;
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

const TrackContainer = styled.div`
  margin-left: 150px;
  margin-top: 4vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #181818;
  height: 100%;
  width: 100vw;
`;

const TrackDisplay = styled.li`
  display: flex;
  flex-direction: row;
  align-items: left;
  margin-bottom: 4vh;
`;
const TrackImg = styled.img`
  height: 80px;
  width: 80px;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  align-items: flex-start;
  width: 100%;
  margin-left: 1vw;
`;

const LoadingPage = () => {
  return <div> Loading </div>;
};

const TrackList = (props) => {
  console.log(props.tracks);
  const tracks = props.tracks;
  const trackItems = tracks.map((track, i) => (
    <TrackDisplay key={track.id}>
      <TrackImg src={track.album.images[0].url} />
      <TrackInfo>
        <div>{track.name}</div>
        <div style={{ color: "grey" }}>{track.artists[0].name}</div>
      </TrackInfo>
    </TrackDisplay>
  ));

  return <ul>{trackItems}</ul>;
};

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    spotifyWebApi.getMyTopTracks({ limit: 50 }).then(
      function (data) {
        console.log("Top tracks", data);
        setTracks(data.items);
      },
      function (err) {
        console.error(err);
        console.log("ERROR");
      }
    );
  }, []);

  return (
    <Container>
      <TrackContainer>
        <h1 style={{ color: "white" }}>Top Tracks</h1>
        <TrackList tracks={tracks} />
      </TrackContainer>
    </Container>
  );
};

export default TopTracks;
