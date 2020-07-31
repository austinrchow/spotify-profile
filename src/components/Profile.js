import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import User from "./User.js";
import TopArtists from "./TopArtists.js";
import TopTracks from "./TopTracks.js";
import Recent from "./Recent.js";

const Profile = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">User</Link>
            </li>
            <li>
              <Link to="/artists">Top Artists</Link>
            </li>
            <li>
              <Link to="/tracks">Top Tracks</Link>
            </li>
            <li>
              <Link to="/recent">Recent</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route component={User} path="/" exact />
          <Route component={TopArtists} path="/artists" />
          <Route component={TopTracks} path="/tracks" />
          <Route component={Recent} path="/recent" />
        </Switch>
      </div>
    </Router>
  );
};

export default Profile;
