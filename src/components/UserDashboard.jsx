import React, { useState, useEffect } from "react";

import UserService from "../services/userService";
import EventBus from "../utils/EventBus";
import { Grid } from "@mui/material";

import '../css/components/userDashboard.css'

import Modal from '../components/Modal';
import AddIcon from '@mui/icons-material/Add';

const UserDashboard = () => {

  const [content, setContent] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    UserService.getUserDashboard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);



  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h3 className="tab-title">Dashboard</h3>
      </Grid>
      <Grid item xs={12}>
        <div className="search-container">
          <h1 className="title">Search if your problem has been resolved.</h1>
          <form onSubmit="event.preventDefault();" role="search">
            <label htmlFor="search">Search for stuff</label>
            <input id="search" type="search" placeholder="Search..." autoFocus required />
            <button type="submit">Go</button>
          </form>
        </div>
      </Grid>

      <Grid item xs={4}>
        <div className="sidebar-button" onClick={props.showAddNewDeviceToUserAccountPopup}>
                <i><AddIcon sx={{ fontSize: 80 }}></AddIcon></i>
                <span className="sidebar-button-text">Add device</span>
                <span className="tooltip">Add new device to your account.</span>
        </div>

      </Grid>
      <Grid item xs={4}>
        <h3>{ }</h3>
      </Grid>
    </Grid>
  );
};

export default UserDashboard;
