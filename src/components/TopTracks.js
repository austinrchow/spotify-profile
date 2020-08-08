import React, { useState, useEffect } from "react";
import styled from "styled-components";
import spotifyWebApi from "../spotify.js";
import "../App.css";
import MdPlay from "react-ionicons/lib/MdPlay";

const Container = styled.div`
  display: flex;
  background-color: #181818;
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

// child of container
const TrackContainer = styled.div`
  margin-left: 150px;
  margin-top: 4vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #181818;
  height: 100%;
  width: 100vw;
  //   pointer-events: none;
`;

// child of track container
const TrackDisplay = styled.li`
  display: flex;
  flex-direction: row;
  align-items: left;
  margin-bottom: 4vh;
  width: 50%;
  :hover .img-top {
    display: inline;
  }
`;

// child of track display
const TrackImg = styled.img`
  height: 80px;
  width: 80px;
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
  width: 50%;
  margin-bottom: 4vh;
`;

// child of times
const TimeDisplay = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: grey;
`;

const addToQueue = (event) => {
  // check if is it currently playing
  let params = [event.target.id];
  console.log(params);
  console.log(typeof params[0]);
  spotifyWebApi.addToMySavedTracks([event.target.id]).then(
    function (data) {
      console.log(data);
    },
    function (err) {
      console.error(err);
    }
  );
};

const play = (e, track, props) => {
  spotifyWebApi
    .play({
      device_id: props.id,
      uris: [track.uri],
      position_ms: 45000,
    })
    .then(
      function (data) {
        console.log(data);
      },
      function (err) {
        console.error(err);
      }
    );
  props.setCurrentTrack(track);
};

const pause = (e, track, props) => {
  spotifyWebApi
    .pause({
      device_id: props.id,
    })
    .then(
      function (data) {
        console.log(data);
      },
      function (err) {
        console.error(err);
      }
    );
  props.setCurrentTrack(null);
};

const TrackList = (props) => {
  const tracks = props.tracks;
  const trackItems = tracks.map((track) => (
    // <a
    //   key={track.id}
    //   href={track.external_urls.spotify}
    //   target="_blank"
    //   rel="noopener noreferrer"
    //   style={{ borderStyle: "none" }}
    // >
    <TrackDisplay key={track.id}>
      <div className="card">
        {/* <MdPlay fontSize="45px" color="white" className="img-top" /> */}

        <TrackImg
          src={track.album.images[0].url}
          onMouseEnter={(event) => play(event, track, props)}
          onMouseLeave={(event) => pause(event, track, props)}
        />
      </div>

      {/* <TrackInfo>
        <div>{track.name}</div>
        <div style={{ color: "grey" }}>{track.artists[0].name}</div>
      </TrackInfo> */}
    </TrackDisplay>
    // </a>
  ));

  return <ul>{trackItems}</ul>;
};

const TrackShowcase = (props) => {
  return (
    <div className="trackShowcase">
      {
        props.currentTrack && (
          <TrackImg src={props.currentTrack.album.images[0].url} />
        )
        //   <div>{props.currentTrack.name}</div>
        //     <div style={{ color: "grey" }}>{props.currentTrack.artists[0].name}</div>
        // </div>
      }
    </div>
  );
};

// calls the spotify get top tracks api to get the top 50 tracks for the user
// there are 3 time durations: short (1 month), medium (6 months), and long (all time)
// updates the track state, which is rendered in the TrackList component
function getTracks(props, event, term) {
  spotifyWebApi.getMyTopTracks({ limit: 50, time_range: term }).then(
    function (data) {
      props.setTracks(data.items);
    },
    function (err) {
      console.error(err);
    }
  );
  document.getElementById(props.selected).classList.remove("active");
  event.target.classList.add("active");
  props.setSelected(event.target.id);
}

const TimeRanges = (props) => {
  return (
    <Times id="times">
      <TimeDisplay
        id="long_term"
        className="time_display active"
        onClick={(event) => getTracks(props, event, "long_term")}
      >
        All Time
      </TimeDisplay>
      <TimeDisplay
        id="medium_term"
        className="time_display"
        onClick={(event) => getTracks(props, event, "medium_term")}
      >
        Last 6 Months
      </TimeDisplay>
      <TimeDisplay
        id="short_term"
        className="time_display"
        onClick={(event) => getTracks(props, event, "short_term")}
      >
        Last Month
      </TimeDisplay>
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
    spotifyWebApi.getMyTopTracks({ limit: 50, time_range: "long_term" }).then(
      function (data) {
        console.log(data.items);
        setTracks(data.items);
      },
      function (err) {
        console.error(err);
      }
    );
  }, []);

  return (
    <Container>
      <TrackContainer>
        <h1 style={{ color: "white" }}>Top Tracks</h1>
        <TimeRanges
          setTracks={setTracks}
          selected={selected}
          setSelected={setSelected}
        />
        <div className="display">
          <TrackList
            tracks={tracks}
            id={id}
            setCurrentTrack={setCurrentTrack}
          />
          <TrackShowcase currentTrack={currentTrack} id={id} />
        </div>
      </TrackContainer>
    </Container>
  );
};

export default TopTracks;
