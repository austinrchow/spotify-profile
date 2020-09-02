import React, { useState, useEffect } from "react";
import "../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import styled from "styled-components";
import { device } from "../sizes.js";
import MdHome from "react-ionicons/lib/MdHome";

import MdPerson from "react-ionicons/lib/MdPerson";
import MdStarOutline from "react-ionicons/lib/MdStarOutline";
import MdHeartOutline from "react-ionicons/lib/MdHeartOutline";
import MdTime from "react-ionicons/lib/MdTime";

const Nav = styled.nav`
  position: fixed;
  width: 150px;
  height: 100vh;
  background: #040306;
  padding: 0;
  z-index: 1;

  @media ${device.tablet} {
    height: 10px;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 100px;
    padding: 0;
  }
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  width: 100%;
  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-evenly;
    padding-top: 0px;
  }
`;

const NavItem = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const NavItemText = styled.span`
  font-size: 14px;
  font-weight: 500;
  padding-left: 10px;
`;

const Navbar = () => {
  let links = document.getElementsByClassName("nav-link");
  console.log(links);
  let id = "";
  for (var i = 0; i < links.length; i++) {
    if (links[i].classList.contains("nav-link-active")) {
      id = links[i].id;
    }
  }
  return (
    <Nav>
      <List>
        <NavLink
          id="nav-link-home"
          to="/"
          className="nav-link"
          activeClassName="nav-link-active"
          exact={true}
        >
          <NavItem>
            <MdHome fontSize="30px" color="#ededed" />
            <NavItemText
              style={
                id === "nav-link-home"
                  ? { color: "white" }
                  : { color: "#ededed" }
              }
            >
              Home
            </NavItemText>
          </NavItem>
        </NavLink>

        <NavLink
          id="nav-link-user"
          to="/user"
          className="nav-link"
          activeClassName="nav-link-active"
        >
          <NavItem>
            <MdPerson fontSize="30px" color="#ededed" />
            <NavItemText
              style={
                id === "nav-link-user"
                  ? { color: "white" }
                  : { color: "#ededed" }
              }
            >
              Profile
            </NavItemText>
          </NavItem>
        </NavLink>

        <NavLink
          id="nav-link-artists"
          to="/artists"
          className="nav-link"
          activeClassName="nav-link-active"
        >
          <NavItem>
            <MdStarOutline fontSize="30px" color="#ededed" />
            <NavItemText
              style={
                id === "nav-link-artists"
                  ? { color: "white" }
                  : { color: "#ededed" }
              }
            >
              Top Artists
            </NavItemText>
          </NavItem>
        </NavLink>

        <NavLink
          id="nav-link-tracks"
          to="/tracks"
          className="nav-link"
          activeClassName="nav-link-active"
        >
          <NavItem>
            <MdHeartOutline fontSize="30px" color="#ededed" />
            <NavItemText
              style={
                id === "nav-link-tracks"
                  ? { color: "white" }
                  : { color: "#ededed" }
              }
            >
              Top Tracks
            </NavItemText>
          </NavItem>
        </NavLink>

        <NavLink
          id="nav-link-recent"
          to="/recent"
          className="nav-link"
          activeClassName="nav-link-active"
        >
          <NavItem>
            <MdTime fontSize="30px" color="#ededed" />
            <NavItemText
              style={
                id === "nav-link-recent"
                  ? { color: "white" }
                  : { color: "#ededed" }
              }
            >
              Recent
            </NavItemText>
          </NavItem>
        </NavLink>
      </List>
    </Nav>
  );
};

export default Navbar;
