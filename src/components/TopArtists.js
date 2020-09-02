import React, { useState, useEffect } from "react";
import styled from "styled-components";
import spotifyWebApi from "../spotify.js";
import "../App.css";
import MdPlay from "react-ionicons/lib/MdPlay";
import $, { data } from "jquery";

const Container = styled.div`
  display: flex;
  background-color: #181818;
  height: 100%;
  min-height: 100vh;
  width: 1200px;
  padding-left: 100px;
  margin: 0 auto;
`;

// child of container
const InnerContainer = styled.div`
  margin-top: 4vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #181818;
  height: 100%;
  width: 100%;
`;

const Display = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

// child of track display
const TrackImg = styled.img`
  height: 100%;
  width: 100%;
  margin: 0;
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
  margin-left: 2vw;
`;

// child of track container
const Times = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-top: 2vh;
  margin-bottom: 4vh;
`;

// child of times
const Term = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: grey;
`;

function play(event, props, artist, id) {
  let audio = document.getElementById(id);
  audio.currentTime = 0;
  audio.play();
  props.setCurrentArtist(artist);
}

function pause(event, props, artist, id) {
  let audio = document.getElementById(id);
  audio.pause();
  props.setCurrentArtist(artist);
}

const ArtistList = (props) => {
  const artists = props.artists;
  console.log("artists", artists);
  const artistItems = artists.map((artist, index) => (
    <div key={index} style={{ height: "80px", width: "80px" }}>
      <TrackImg
        src={artist.images[1].url}
        onMouseOver={(event) =>
          play(event, props, artist, "artist_audio_" + artist.id)
        }
        onMouseOut={(event) =>
          pause(event, props, artist, "artist_audio_" + artist.id)
        }
      />
      <audio
        id={"artist_audio_" + artist.id}
        src={artist.topTrack.preview_url}
        autoplay
      ></audio>
    </div>
  ));

  return <ul className="trackDisplay">{artistItems}</ul>;
};

const TrackShowcase = (props) => {
  return (
    <div className="trackShowcase">
      {props.currentArtist && (
        <img
          style={{ width: "400px", height: "400px" }}
          src={props.currentArtist.images[1].url}
        />
      )}
    </div>
  );
};

const TrackInformation = (props) => {
  let names = [];

  if (props.currentArtist) {
    console.log(props.currentArtist);
    for (var i = 0; i < props.currentArtist.topTrack.artists.length; i++) {
      names.push(props.currentArtist.topTrack.artists[i].name);
    }
  }
  console.log(names);
  return (
    <div style={{ width: "100%" }}>
      {props.currentArtist && (
        <div className="trackInformation">
          <div style={{ color: "grey", fontSize: 18 }}>
            {props.currentArtist.topTrack.name}
          </div>
          <div style={{ color: "grey", fontSize: 14 }}>{names.join(", ")}</div>

          <div style={{ color: "grey", fontSize: 14, marginTop: "15px" }}>
            The top track on Spotify for
          </div>

          <div style={{ color: "white", fontSize: 18 }}>
            {props.currentArtist.name}
          </div>
        </div>
      )}
    </div>
  );
};

// calls the spotify get top tracks api to get the top 50 tracks for the user
// there are 3 time durations: short (1 month), medium (6 months), and long (all time)
// updates the track state, which is rendered in the TrackList component
function getTracks(props, event, term) {
  spotifyWebApi
    .getMyTopArtists({ limit: 50, time_range: term })
    .then(function (data) {
      return data.items;
    })
    .then(function (artists) {
      let promises = [];
      for (var i = 0; i < artists.length; i++) {
        let topTracks = spotifyWebApi.getArtistTopTracks(
          artists[i].id,
          "from_token",
          {}
        );
        promises.push(topTracks);
      }
      return [promises, artists];
    })
    .then(function (artistsInfo) {
      let artistList = artistsInfo[1];
      Promise.all(artistsInfo[0]).then(function (results) {
        for (var i = 0; i < results.length; i++) {
          artistList[i].topTrack = results[i].tracks[0];
        }
        props.setArtists(artistList);
      });
    })
    .catch(function (error) {
      console.error(error);
    });

  document.getElementById(props.selected).classList.remove("active");
  event.target.classList.add("active");
  props.setSelected(event.target.id);
}

const TimeRanges = (props) => {
  return (
    <Times id="times">
      <Term
        id="long_term"
        className="time_display active"
        onClick={(event) => getTracks(props, event, "long_term")}
      >
        All Time
      </Term>
      <Term
        id="medium_term"
        className="time_display"
        onClick={(event) => getTracks(props, event, "medium_term")}
      >
        Last 6 Months
      </Term>
      <Term
        id="short_term"
        className="time_display"
        onClick={(event) => getTracks(props, event, "short_term")}
      >
        Last Month
      </Term>
    </Times>
  );
};

const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const [selected, setSelected] = useState("long_term");
  const [currentArtist, setCurrentArtist] = useState(null);
  const [id, setID] = useState("");

  spotifyWebApi.getMyDevices().then(
    function (data) {
      let device = data.devices.filter(function (t) {
        return t.name.localeCompare("Your Spotify Profile") === 0;
      });
      setID(device[0].id);
    },
    function (err) {
      console.error(err);
    }
  );

  useEffect(() => {
    spotifyWebApi
      .getMyTopArtists({ limit: 50, time_range: "long_term" })
      .then(function (data) {
        return data.items;
      })
      .then(function (artists) {
        let promises = [];
        for (var i = 0; i < artists.length; i++) {
          let topTracks = spotifyWebApi.getArtistTopTracks(
            artists[i].id,
            "from_token",
            {}
          );
          promises.push(topTracks);
        }
        return [promises, artists];
      })
      .then(function (artistsInfo) {
        let artistList = artistsInfo[1];
        Promise.all(artistsInfo[0]).then(function (results) {
          for (var i = 0; i < results.length; i++) {
            artistList[i].topTrack = results[i].tracks[0];
          }
          setArtists(artistList);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <InnerContainer>
        <h1 style={{ color: "white", width: "100%" }}>Top Artists</h1>
        <TimeRanges
          setArtists={setArtists}
          selected={selected}
          setSelected={setSelected}
        />
        <Display>
          <ArtistList
            artists={artists}
            id={id}
            setCurrentArtist={setCurrentArtist}
          />
          <TrackShowcase currentArtist={currentArtist} id={id} />
        </Display>

        <TrackInformation currentArtist={currentArtist} id={id} />
        <audio id="myAudio"></audio>
      </InnerContainer>
    </Container>
  );
};

export default TopArtists;
