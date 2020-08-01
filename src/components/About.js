import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #181818;
  height: 100vh;
  width: 100vw;
  margin-left: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InformationContainer = styled.div`
  text-align: left;
  color: white;
  width: 35vw;
  margin-top: 7vh;
  height: 100vh;
`;

const Title = styled.div`
  font-size: 45px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1db954;
`;

const SubTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1db954;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5;
  margin-bottom: 5vh;
  color: white;
`;
const About = () => {
  return (
    <Container>
      <InformationContainer>
        <Title>Spotify Profile</Title>
        <Text>
          With Spotify Profile, you can find your top artists and songs. You can
          find songs that you may have already forgotten. Perhaps an old crush
          that you played repeatedly during summer weeks before you had to move
          on. Refresh your memories and create Spotify playlists from your
          favorite Tracks and Artists.
        </Text>
        <SubTitle>Spotify Access</SubTitle>
        <Text>
          Application requires a Spotify account. It also needs access to your
          Spotify account. Application works as client side only and your
          Spotify data is not stored. I logged in with wrong Spotify account.
          worries, just go to accounts.spotify.com and press Log out -button.
          Then open replayify.com/login and sign in with different account.
        </Text>

        <SubTitle>Privacy</SubTitle>
        <Text>
          Application requires a Spotify account. It also needs access to your
          Spotify account. Application works as client side only and your
          Spotify data is not stored.
        </Text>
      </InformationContainer>
    </Container>
  );
};

export default About;
