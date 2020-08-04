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
        return data.devices.filter(function (t) {
          return t.name.localeCompare("Spotify Profile") === 0;
        });
      },
      function (err) {
        console.error(err);
      }
    )
    .then(function (devices) {
      spotifyWebApi
        .play({
          device_id: devices[0].id,
          uris: ["spotify:track:3pXF1nA74528Edde4of9CC"],
        })
        .then(
          function (data) {
            console.log(data);
          },
          function (err) {
            console.error(err);
          }
        );
    });
};

// const playNow = (event) => {
//   console.log("in play now", event);
//   spotifyWebApi
//     .play({
//       device_id: devices[1],
//       uris: ["spotify:track:3pXF1nA74528Edde4of9CC"],
//     })
//     .then(
//       function (data) {
//         console.log(data);
//       },
//       function (err) {
//         console.error(err);
//       }
//     );
// };

const TopArtists = () => {
  const [devices, setDevices] = useState("");

  useEffect(() => {
    spotifyWebApi.getMyDevices().then(
      function (data) {
        for (var i; i < data.devices.length; i++) {
          console.log(data.devices[i]);
        }
      },
      function (err) {
        console.error(err);
      }
    );
  }, []);

  return (
    <Container>
      hello
      {/* <button onClick={(event) => play()} style={{ marginLeft: "150px" }}>
        Top Artists
      </button> */}
      <div
        onMouseOver={(event) => play()}
        style={{ marginLeft: "150px", color: "white" }}
      >
        Top Artists
      </div>
    </Container>
  );
};

export default TopArtists;
