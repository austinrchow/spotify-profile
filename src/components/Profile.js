import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import User from "./User.js";
import TopArtists from "./TopArtists.js";
import TopTracks from "./TopTracks.js";
import Recent from "./Recent.js";
import Navbar from "./Navbar.js";
import About from "./About.js";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: relative;
  background-color: #181818;
  width: 100%;
  height: 100%;
`;

const Profile = () => {
  return (
    <Router>
      <Container>
        {/* <Next>div</Next> */}
        <Navbar />
        <Switch>
          <Route component={About} path="/" exact />
          <Route component={User} path="/user" exact />
          <Route component={TopArtists} path="/artists" />
          <Route component={TopTracks} path="/tracks" />
          <Route component={Recent} path="/recent" />
        </Switch>
      </Container>
    </Router>
  );
};

export default Profile;
