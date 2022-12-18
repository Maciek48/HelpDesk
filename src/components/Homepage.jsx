import React from "react";
import { Link } from "react-router-dom";
import home from "../assets/home.png";

export default function Homepage() {
  return (
    <div className="home">
      <div className="container">
        <div className="content">
          <p className="sub-title">JOIN US</p>
          <h1 className="title">Welcome to Resolved</h1>
          <p className="description">
            Recieve proffesional support for your Apple devices from skilled agents and easily manage issued tickets.
          </p>
          <div className="button-container">
          <Link to={"/register"}><button>Sign Up</button></Link>
          <Link to={"/login"}><button>Sign in</button></Link>
          </div>
        </div>
        <div className="image-container">
          <div className="image">
            <img src={home} alt="home image" />
          </div>
          <div className="ellipse-container">
            <div className="ellipse pink"></div>
            <div className="ellipse orange"></div>
          </div>
        </div>
      </div>
    </div>
  );
}