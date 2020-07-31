import React, { useState, useEffect } from "react";

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
