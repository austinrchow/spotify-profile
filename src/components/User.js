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
  align-items: center;
  flex-direction: column;
  background-color: #181818;
  height: 100vh;
  width: 100vw;
`;

const UserImageCropper = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin: 100px 0 30px 0;
`;

const UserImage = styled.img`
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
`;

const UserDisplayName = styled.div`
  color: white;
  font-size: 40px;
  font-weight: 600;
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
        <UserImageCropper>
          <UserImage src={displayImage} />
        </UserImageCropper>
        <UserDisplayName> {displayName} </UserDisplayName>
      </UserInformation>
    </Container>
  );
};

export default User;
