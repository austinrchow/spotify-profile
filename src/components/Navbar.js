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
  min-height: 100vh;
  background: #040306;
  padding: 50px 0;

  @media ${device.tablet} {
    height: 10px;
    // top: auto;
    // bottom: 0;
    // right: 0;
    // width: 100%;
    // height: auto;
  }

//   & > * {
//     width: 100%;
//     @media ${device.tablet} {
//       height: 100%;
//     };
//   }
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0;
`;

const NavItemText = styled.span`
  color: white;
  padding: 0;
`;

const Navbar = () => {
  return (
    <Nav>
      <List>
        <Link to="/" className="nav-link">
          <NavItem>
            <MdHome fontSize="35px" color="white" />
          </NavItem>
        </Link>

        <NavLink
          to="/user"
          className="nav-link"
          activeClassName="nav-link-active"
        >
          <NavItem>
            <MdPerson fontSize="35px" color="white" />
            <NavItemText>Profile</NavItemText>
          </NavItem>
        </NavLink>

        <NavLink
          to="/artists"
          className="nav-link"
          activeClassName="nav-link-active"
        >
          <NavItem>
            <MdStarOutline fontSize="35px" color="white" />
            <NavItemText>Top Artists</NavItemText>
          </NavItem>
        </NavLink>

        <NavLink
          to="/tracks"
          className="nav-link"
          activeClassName="nav-link-active"
        >
          <NavItem>
            <MdHeartOutline fontSize="35px" color="white" />
            <NavItemText>Top Tracks</NavItemText>
          </NavItem>
        </NavLink>

        <NavLink
          to="/recent"
          className="nav-link"
          activeClassName="nav-link-active"
        >
          <NavItem>
            <MdTime fontSize="35px" color="white" />
            <NavItemText>Recent</NavItemText>
          </NavItem>
        </NavLink>
      </List>
    </Nav>
  );
};

export default Navbar;
