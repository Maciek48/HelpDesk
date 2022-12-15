import React, { useState, useEffect } from "react";

import UserService from "../services/userService";
import EventBus from "../utils/EventBus";

const AdminDashboard = () => {
  const [content, setContent] = useState("");

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
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default AdminDashboard;
