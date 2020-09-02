import React, { useState, useEffect } from "react";

const login_url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/login"
    : "https://spotify-prof-backend.herokuapp.com/login";
const Login = () => {
  console.log("login url,", login_url);
  return (
    <div>
      <button onClick={() => (window.location = login_url)}>
        Login With Spotify
      </button>
      Hello
    </div>
  );
};

export default Login;
