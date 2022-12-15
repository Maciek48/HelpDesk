import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./css/App.scss";

// Services

import AuthService from "./services/authService";

// Navigation

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer"

// Content

import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import UserDashboard from "./components/UserDashboard";
import ModeratorDashboard from "./components/ModeratorDashboard";
import AdminDashboard from "./components/AdminDashboard";
import UserTickets from "./components/UserTickets";
import AdminTickets from "./components/AdminTickets";
import NewTicketPopup from "./components/NewTicketPopup";
import AdminUsers from "./components/AdminUsers";
import TicketDetail from "./components/TicketDetail";
import OnlyLoggedIn from "./components/OnlyLoggedIn";
import ResetPassword from "./components/ResetPassword";
import ResetEmail from "./components/ResetEmail";


// Utilities

import EventBus from "./utils/EventBus";
import { useSessionStorage } from './utils/UseSessionStorage';


const App = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [showUserDashboard, setShowUserDashboard] = useState(false);
    const [showModeratorDashboard, setShowModeratorDashboard] = useState(false);
    const [showAdminDashboard, setShowAdminDashboard] = useState(false);

    const [theme, setTheme] = useSessionStorage('theme', "light");
    const [expandedSidebar, setExpandedSidebar] = useState(false);
    const [showNewTicketPopup, setShowNewTicketPopup] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowUserDashboard(user.roles.includes("ROLE_USER"));
            setShowModeratorDashboard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminDashboard(user.roles.includes("ROLE_ADMIN"));
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setShowUserDashboard(false);
        setShowModeratorDashboard(false);
        setShowAdminDashboard(false);
        setCurrentUser(undefined);
        window.location.reload();
    };

    const expandSidebar = () => {
        setExpandedSidebar(true);
    };

    const collapseSidebar = () => {
        setExpandedSidebar(false);
    };

    const changeTheme = () => {
      theme === "light" ? setTheme("dark") : setTheme("light");
    };

    const handleShowNewTicketPopup = () => {
        setShowNewTicketPopup(!showNewTicketPopup);
    }



    // If user is logged in show sidebar menu
    if(currentUser) {
        return (
            <div data-theme={theme} className="container-with-sidebar">

                {showNewTicketPopup && <NewTicketPopup handleClose={handleShowNewTicketPopup}/> }

                <Sidebar 
                    isOpen={expandedSidebar}
                    showSidebar={expandSidebar}
                    hideSidebar={collapseSidebar}
                    showUserDashboard={showUserDashboard}
                    showModeratorDashboard={showModeratorDashboard}
                    showAdminDashboard={showAdminDashboard}
                    logOut={logOut}
                    changeTheme={changeTheme}
                    currentTheme={theme}
                    showNewTicketPopup={handleShowNewTicketPopup}
                />
                
                <div className="dashboard-container" onMouseEnter={collapseSidebar}>
                    <Routes>
                        
                        {/*Sciezki dostepu dla kazdego uzytkownika, moderatora i admina*/}

                        <Route path="/*" exact element={<Navigate replace to="/dashboard" />} />
                        <Route path="/profile" exact element={<Profile />} />

                        <Route path="/user" exact element={<UserDashboard  showNewTicketPopup={showNewTicketPopup}/>} />
                        <Route path="/mod" exact element={<ModeratorDashboard />} />
                        <Route path="/admin" exact element={<AdminDashboard />} />
                        
                        {<Route path="/resetpasword" exact element={<ResetPassword />} /> }
                        {<Route path="/resetemail" exact element={<ResetEmail />} /> }


                        {/*Sciezki dostepu usera*/}
                        {showUserDashboard && <Route path="/dashboard" exact element={<Navigate replace to="/user" />} /> }
                        {showUserDashboard && <Route path="/tickets" exact element={<UserTickets />} /> }
                        {showUserDashboard && <Route path="/tickets/:id" exact element={<TicketDetail />} /> }

                        {/*Sciezki dostepu admina*/}
                        {showAdminDashboard && <Route path="/dashboard" exact element={<Navigate replace to="/admin" />} /> }
                        {showAdminDashboard && <Route path="/tickets" exact element={<AdminTickets />} /> }
                        {showAdminDashboard && <Route path="/users" exact element={<AdminUsers />} /> }
                        {showAdminDashboard && <Route path="/tickets/:id" exact element={<TicketDetail />} /> }

                        {/*Sciezki dostepu moderatora*/}
                        {showModeratorDashboard && <Route path="/dashboard" exact element={<Navigate replace to="/mod" />} /> }
                        
                    </Routes>
                </div>
            </div>
        );
    };

  // If user is not logged in show default navbar
    if(!currentUser) {
        return (
            <div data-theme={theme} className="app-container">
                <Navbar changeTheme={changeTheme} currentTheme={theme} />
                <Routes>
                    <Route path="/" exact element={<Homepage/>} />
                    <Route path="/login" exact element={<Login/>} />
                    <Route path="/register" exact element={<Register/>} />
                    <Route path="/*" exact element={<Navigate replace to="/" />} />
                </Routes>
                <Footer/>
            </div>
        );
    }
};

export default App;
