import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #181818;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  vertical-align: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 35px;
  font-weight: 700;
  color: white;
  margin-bottom: 30px;
`;
const LoginButton = styled.div`
  font-size: 20px;
  background-color: #1db954;
  color: white;
  height: 45px;
  width: 300px;
  line-height: 45px;
  margin: 0 auto;
  border-radius: 25px;
  font-weight: 500;
`;

const login_url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/login"
    : "https://spotify-prof-backend.herokuapp.com/login";
const Login = () => {
  console.log("login url,", login_url);
  return (
    <Container>
      <Title>Spotify Profile</Title>
      <LoginButton onClick={() => (window.location = login_url)}>
        LOG IN TO SPOTIFY
      </LoginButton>
    </Container>
  );
};

export default Login;
