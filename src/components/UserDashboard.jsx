import React, { useState, useEffect } from "react";
//import Popup from 'reactjs-popup';

import UserService from "../services/userService";
import EventBus from "../utils/EventBus";
import { Grid } from "@mui/material";

import '../css/components/userDashboard.css'

import AddIcon from '@mui/icons-material/Add';
import Modal from "./Modal";
import { Add } from "@mui/icons-material";

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
        <div className="button-continer">

          <button onClick={() => setOpenModal(true)} className="button-display">
            <AddIcon sx={{ fontSize: 80 }}></AddIcon>
          </button>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
          />
          <label className="label-for-add-button">Add Device</label>
        </div>

      </Grid>
      <Grid item xs={4}>
        <div className="button-container">
          Your devices:
          
        </div>
      </Grid>
      <Grid item xs={4}>
        <h3>{ }</h3>
      </Grid>
    </Grid>
  );
};

export default UserDashboard;
