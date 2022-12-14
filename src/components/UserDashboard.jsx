import React, { useState, useEffect } from "react";
import Input from "react-validation/build/input";

import UserService from "../services/userService";
import EventBus from "../utils/EventBus";

import { Grid } from "@mui/material";

const UserDashboard = () => {

  const [content, setContent] = useState("");

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
            <h3>{}</h3>
        </Grid>
      </Grid>
  );
};

export default UserDashboard;
