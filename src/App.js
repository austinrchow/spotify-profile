import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Login from "./components/Login.js";
import Profile from "./components/Profile.js";
import spotifyWebApi from "./spotify.js";
import {
  getHashParams,
  useInterval,
  checkForPlayer,
} from "./components/Utils.js";

function App() {
  // get token here TODO: refresh token
  const params = getHashParams();
  const [delay, setDelay] = useState(1000);
  const [isCheckingPlayer, setIsCheckingPlayer] = useState(true);
  const [loggedIn, setLoggedIn] = useState(params.access_token ? true : false);
  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  useInterval(
    () => {
      checkForPlayer(params.access_token, setIsCheckingPlayer);
    },
    isCheckingPlayer ? delay : null
  );

  return <div className="App">{loggedIn ? <Profile /> : <Login />}</div>;
}

export default App;
