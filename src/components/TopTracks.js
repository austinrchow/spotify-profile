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
  width: 50vw;
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

const Times = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 50vw;
  margin-bottom: 4vh;
`;

const TimeDisplay = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: grey;
`;

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

function getTracks(setTracks, term) {
  spotifyWebApi.getMyTopTracks({ limit: 50, time_range: term }).then(
    function (data) {
      setTracks(data.items);
    },
    function (err) {
      console.error(err);
    }
  );
}

const TimeRanges = (props) => {
  return (
    <Times>
      <TimeDisplay onClick={() => getTracks(props.setTracks, "long_term")}>
        All Time
      </TimeDisplay>
      <TimeDisplay onClick={() => getTracks(props.setTracks, "medium_term")}>
        Last 6 Months
      </TimeDisplay>
      <TimeDisplay onClick={() => getTracks(props.setTracks, "short_term")}>
        Last Month
      </TimeDisplay>
    </Times>
  );
};
const TopTracks = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getTracks(setTracks, "long_term");
  }, []);

  return (
    <Container>
      <TrackContainer>
        <h1 style={{ color: "white" }}>Top Tracks</h1>
        <TimeRanges setTracks={setTracks} />

        <TrackList tracks={tracks} />
      </TrackContainer>
    </Container>
  );
};

export default TopTracks;
