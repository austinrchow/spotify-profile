import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import SpotifyPlayer from "react-spotify-web-playback";
import spotifyWebApi from "../spotify.js";

const Container = styled.div`
  display: flex;
  background-color: #181818;
  height: 100vh;
  width: 100vw;
  color: white;
`;

const play = (event) => {
  spotifyWebApi
    .getMyDevices()
    .then(
      function (data) {
        return data.devices.map(function (t) {
          return t.id;
        });
      },
      function (err) {
        console.error(err);
      }
    )
    .then(function (devices) {
      console.log("here", devices[1]);
      spotifyWebApi.transferMyPlayback([devices[1]]).then(
        function (data) {
          console.log(data);
        },
        function (err) {
          console.error(err);
        }
      );
    });
};

const playNow = (event) => {
  console.log("in play now", event);
  spotifyWebApi.play({ uris: ["spotify:track:3pXF1nA74528Edde4of9CC"] }).then(
    function (data) {
      console.log(data);
    },
    function (err) {
      console.error(err);
    }
  );
};

const TopArtists = () => {
  return (
    <Container>
      <button onClick={(event) => play()} style={{ marginLeft: "150px" }}>
        Top Artists
      </button>

      <div
        onMouseOver={(event) => playNow()}
        style={{ marginLeft: "150px", color: "white" }}
      >
        Top Artists
      </div>
    </Container>
  );
};

export default TopArtists;
