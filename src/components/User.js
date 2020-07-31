import React, { useState, useEffect } from "react";
import styled from "styled-components";
import spotifyWebApi from "../spotify.js";

const Container = styled.div`
  display: flex;
  background-color: #181818;
  height: 100vh;
  width: 100vw;
`;

const UserInformation = styled.div`
  margin-left: 150px;
  display: flex;
  flex-direction: row;
  background-color: #181818;
  height: 100vh;
  width: 100vw;
`;

const User = () => {
  const [displayName, setDisplayName] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  useEffect(() => {
    spotifyWebApi
      .getMe() // note that we don't pass a user id
      .then(
        function (data) {
          console.log("User Information", data);
          setDisplayName(data.display_name);
          setDisplayImage(data.images[0].url);
        },
        function (err) {
          console.error(err);
        }
      );
  });

  return (
    <Container>
      <UserInformation>
        <div> {displayName} </div>
        <img src={displayImage} />
      </UserInformation>
    </Container>
  );
};

export default User;
