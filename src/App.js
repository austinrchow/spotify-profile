import React, { useState, useEffect } from "react";
import "./App.css";

import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

function getNowPlaying(nowPlaying, setNowPlaying) {
  spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
    console.log("here, ", response);
    if (response.item !== undefined) {
      console.log("hello");
      setNowPlaying({
        name: response.item.name,
        image: response.item.album.images[0].url,
      });
    }
    console.log(nowPlaying);
  });

  spotifyWebApi
    .getMe() // note that we don't pass a user id
    .then(
      function (data) {
        console.log("User playlists", data);
      },
      function (err) {
        console.error(err);
      }
    );
}

function App() {
  const params = getHashParams();
  const [loggedIn, setLoggedIn] = useState(params.access_token ? true : false);
  const [nowPlaying, setNowPlaying] = useState({
    name: "Not Checked",
    image: "",
  });

  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  return (
    <div className="App">
      Hello
      <a href="http://localhost:8888/">
        <button>Login With Spotify</button>
      </a>
      <div> Now Playing: {nowPlaying.name} </div>
      <div>
        <img src={nowPlaying.image} style={{ width: 100 }} />
      </div>
      <button onClick={() => getNowPlaying(nowPlaying, setNowPlaying)}>
        Check Now Playing
      </button>
    </div>
  );
}

export default App;
