import React, { useState, useEffect } from "react";

const login_url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/login"
    : "https://spotify-prof.herokuapp.com/login";
const Login = () => {
  return (
    <div>
      {/* <a href="http://localhost:8888/login"> */}
      <button onClick={() => (window.location = { login_url })}>
        Login With Spotify
      </button>
      {/* </a> */}
      Hello
    </div>
  );
};

export default Login;
