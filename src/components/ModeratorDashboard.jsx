import React, { useState, useEffect } from "react";

import UserService from "../services/userService";
import EventBus from "../utils/EventBus";

const ModeratorDashboard = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getModeratorDashboard().then(
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
    <div className="container">
      <header className="jumbotron">
        <h3>Moderator dashboard</h3>
      </header>
    </div>
  );
};

export default ModeratorDashboard;
