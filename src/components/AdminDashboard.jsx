import React, { useState, useEffect } from "react";

import UserService from "../services/userService";
import EventBus from "../utils/EventBus";
import { Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddDeviceToUserAccountPopup from './AddDeviceToUserAccountPopup';

const AdminDashboard = () => {
  const [content, setContent] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    UserService.getAdminDashboard().then(
      (response) => {
        setContent(response.data.message);
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
        <div className="container">
          <header className="jumbotron">
            <h3>Admin dashboard</h3>
          </header>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className="button-continer">

          <button onClick={() => setOpenModal(true)} className="button-display">
            <AddIcon sx={{ fontSize: 80 }}></AddIcon>
          </button>
          <AddDeviceToUserAccountPopup
            open={openModal}
            onClose={() => setOpenModal(false)} />

          <label className="label-for-add-button">Add Device</label>



        </div>

      </Grid>
    </Grid>

  );
};

export default AdminDashboard;
