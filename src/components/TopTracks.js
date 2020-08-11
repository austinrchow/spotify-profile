import React, { useState, useEffect } from "react";
import styled from "styled-components";
import spotifyWebApi from "../spotify.js";
import "../App.css";
import MdPlay from "react-ionicons/lib/MdPlay";
import $ from "jquery";

const Container = styled.div`
  display: flex;
  background-color: #181818;
  height: 100%;
  min-height: 100vh;
  width: 1300px;
  padding-left: 200px;
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

function play(event, props, track, id) {
  let audio = document.getElementById(id);
  audio.play();
  props.setCurrentTrack(track);
}

function pause(event, props, track, id) {
  let audio = document.getElementById(id);
  audio.pause();
  props.setCurrentTrack(track);
}
const TrackList = (props) => {
  const tracks = props.tracks;
  const trackItems = tracks.map((track, index) => (
    <div key={index} style={{ height: "80px", width: "80px" }}>
      <TrackImg
        src={track.album.images[0].url}
        onMouseOver={(event) =>
          play(event, props, track, "audio_" + String(index))
        }
        onMouseOut={(event) =>
          pause(event, props, track, "audio_" + String(index))
        }
      />
      <audio id={"audio_" + String(index)}>
        <source src={track.preview_url}></source>
      </audio>
    </div>
  ));

  return <ul className="trackDisplay">{trackItems}</ul>;
};

const TrackShowcase = (props) => {
  return (
    <div className="trackShowcase">
      {props.currentTrack && (
        <img
          style={{ width: "400px", height: "400px" }}
          src={props.currentTrack.album.images[0].url}
        />
      )}
    </div>
  );
};

const TrackInformation = (props) => {
  return (
    <div style={{ width: "100%" }}>
      {props.currentTrack && (
        <div className="trackInformation">
          <div style={{ color: "grey", fontSize: 18 }}>
            {props.currentTrack.name}
          </div>
          <div style={{ color: "grey", fontSize: 14 }}>
            {props.currentTrack.artists[0].name}
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
    .getMyTopTracks({ limit: 50, time_range: term })
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
      props.setTracks(tracksInfo.tracks);
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

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState("long_term");
  const [currentTrack, setCurrentTrack] = useState(null);
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
      .getMyTopTracks({ limit: 50, time_range: "long_term" })
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
        console.log(tracksInfo);
        setTracks(tracksInfo.tracks);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <InnerContainer>
        <h1 style={{ color: "white", width: "100%" }}>Top Tracks</h1>
        <TimeRanges
          setTracks={setTracks}
          selected={selected}
          setSelected={setSelected}
        />
        <Display>
          <TrackList
            tracks={tracks}
            id={id}
            setCurrentTrack={setCurrentTrack}
          />
          <TrackShowcase currentTrack={currentTrack} id={id} />
        </Display>
        <TrackInformation currentTrack={currentTrack} id={id} />
        <audio id="myAudio"></audio>
      </InnerContainer>
    </Container>
  );
};

export default TopTracks;
