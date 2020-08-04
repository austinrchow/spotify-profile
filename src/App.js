import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Login from "./components/Login.js";
import Profile from "./components/Profile.js";
import spotifyWebApi from "./spotify.js";
import queryString from "query-string";
import { access } from "fs";

function getHashParams() {
  console.log("window location: ", window.location);
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  console.log("hash param: ", hashParams);
  return hashParams;
}

// function getNowPlaying(nowPlaying, setNowPlaying) {
//   spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
//     console.log("here, ", response);
//     if (response.item !== undefined) {
//       console.log("hello");
//       setNowPlaying({
//         name: response.item.name,
//         image: response.item.album.images[0].url,
//       });
//     }
//     console.log(nowPlaying);
//   });

//   spotifyWebApi
//     .getMe() // note that we don't pass a user id
//     .then(
//       function (data) {
//         console.log("User playlists", data);
//       },
//       function (err) {
//         console.error(err);
//       }
//     );
// }

const checkForPlayer = (access_token, setIsCheckingPlayer) => {
  if (window.Spotify !== null) {
    setIsCheckingPlayer(false);
    console.log("in call back");
    const token = access_token;
    console.log(token);
    const player = new window.Spotify.Player({
      name: "Your Spotify Profile",
      getOAuthToken: (cb) => {
        cb(token);
      },
    });
    // Error handling
    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("authentication_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("account_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("playback_error", ({ message }) => {
      console.error(message);
    });
    // Playback status updates
    player.addListener("player_state_changed", (state) => {
      console.log(state);
    });
    // Ready
    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
    });
    // Not Ready
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });
    // Connect to the player!
    player.connect();
  }
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      console.log("I get into here");
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  // get token here TODO: refresh token
  const params = getHashParams();
  const [delay, setDelay] = useState(1000);
  const [isCheckingPlayer, setIsCheckingPlayer] = useState(true);
  console.log("params:", params);

  // check to see if we need to refresh token

  const [loggedIn, setLoggedIn] = useState(params.access_token ? true : false);
  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  useInterval(
    () => {
      // Your custom logic here
      checkForPlayer(params.access_token, setIsCheckingPlayer);
    },
    isCheckingPlayer ? delay : null
  );

  // useEffect(() => {
  //   if (params.access_token) {
  //     let interval = setInterval(() => {
  //       checkForPlayer(params.access_token, setPlayerCheckInterval);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // });

  return (
    <div className="App">
      {/* <Profile /> */}
      {loggedIn ? <Profile /> : <Login />}
      {/* Hello
      <a href="http://localhost:8888/">
        <button>Login With Spotify</button>
      </a>
      <div> Now Playing: {nowPlaying.name} </div>
      <div>
        <img src={nowPlaying.image} style={{ width: 100 }} />
      </div>
      <button onClick={() => getNowPlaying(nowPlaying, setNowPlaying)}>
        Check Now Playing
      </button> */}
    </div>
  );
}

export default App;
