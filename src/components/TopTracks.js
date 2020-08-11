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
  width: 1200px;
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
  width: 100%;
  //   pointer-events: none;
`;

// child of track display
const TrackImg = styled.img`
  height: 80px;
  width: 80px;
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

const play = (e, track, props, setAudio) => {
  console.log(track.preview_url);
  setAudio(new Audio(track.preview_url));
  //   audio.volume = volume;

  //   var x = $("#myFrame").find("button");
  //   console.log(x);

  //   spotifyWebApi
  //     .play({
  //       device_id: props.id,
  //       uris: [track.uri],
  //       position_ms: 45000,
  //     })
  //     .then(
  //       function (data) {
  //         console.log(data);
  //       },
  //       function (err) {
  //         console.error(err);
  //       }
  //     );
  props.setCurrentTrack(track);
};

const pause = (e, track, props, audio) => {
  audio.pause();
  //   spotifyWebApi
  //     .pause({
  //       device_id: props.id,
  //     })
  //     .then(
  //       function (data) {
  //         console.log(data);
  //       },
  //       function (err) {
  //         console.error(err);
  //       }
  //     );
  props.setCurrentTrack(null);
};

const TrackList = (props) => {
  const [audio, setAudio] = useState(null);
  useEffect(() => {
    if (audio) {
      audio.autoplay = false;
      audio.play();
    }
  }, [audio]);
  const tracks = props.tracks;
  const trackItems = tracks.map((track, index) => (
    <TrackImg
      src={track.album.images[0].url}
      onMouseEnter={(event) => play(event, track, props, setAudio)}
      onMouseLeave={(event) => pause(event, track, props, audio)}
      key={index}
    />
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
      {props.currentTrack && (
        <div>
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
        setTracks(tracksInfo.tracks);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <TrackContainer>
        {/* <h1 style={{ color: "white" }}>Top Tracks</h1>
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
        </div> */}
      </TrackContainer>
    </Container>
  );
};

export default TopTracks;
