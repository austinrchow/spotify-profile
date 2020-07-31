import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;
  width: 150px;
  height: 100%;
  background: #040306;
  padding: 30px 0;
`;

const List = styled.li`
  padding: 15px;
`;

const ListItem = styled.ul`
  padding: 15px;
`;

const Navbar = () => {
  return (
    <Nav>
      <List>
        <ListItem>
          <Link to="/">User</Link>
        </ListItem>

        <ListItem>
          <Link to="/artists">Top Artists</Link>
        </ListItem>

        <ListItem>
          <Link to="/tracks">Top Tracks</Link>
        </ListItem>

        <ListItem>
          <Link to="/recent">Recent</Link>
        </ListItem>
      </List>
    </Nav>
  );
};

export default Navbar;
