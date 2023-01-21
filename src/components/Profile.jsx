import React from "react";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import AuthService from "../services/authService";

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  let navigate = useNavigate();

  const resetPasswordHandle = React.useCallback(
    () => {
      navigate('/reset');
    },[navigate]
  );

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Name: </strong> {currentUser.firstName} {currentUser.lastName}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <div className="container">
      <Stack direction="row" spacing={2}>
        <br/>
        <Button variant="outlined" startIcon={<SendIcon />} onClick={resetPasswordHandle}>
          Reset Password
        </Button>
      </Stack>
      </div>
    </div>
  );
};

export default Profile;
