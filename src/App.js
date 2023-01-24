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
import AddNewDeviceToUserAccountPopup from "./components/AddDeviceToUserAccountPopup"
import AdminUsers from "./components/AdminUsers";
import TicketDetail from "./components/TicketDetail";
import ResetPassword from "./components/ResetPassword";
import ResetEmail from "./components/ResetEmail";
import AddModerator from "./components/AddModerator";
import UserArticles from "./components/UserArticles";
import ArticleDetail from "./components/ArticleDetail";
import AdminArticles from "./components/AdminArticles";
import AddArticle from "./components/AddArticle";


// Utilities

import EventBus from "./utils/EventBus";
import { useSessionStorage } from './utils/UseSessionStorage';
//import { AddModerator } from "@mui/icons-material";


const App = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [showUserDashboard, setShowUserDashboard] = useState(false);
    const [showModeratorDashboard, setShowModeratorDashboard] = useState(false);
    const [showAdminDashboard, setShowAdminDashboard] = useState(false);

    const [theme, setTheme] = useSessionStorage('theme', "light");
    const [expandedSidebar, setExpandedSidebar] = useState(false);
    const [showNewTicketPopup, setShowNewTicketPopup] = useState(false);
    const [showAddNewDeviceToUserAccountPopup, setShowAddNewDeviceToUserAccountPopup] = useState(false);

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

    const handleShowAddNewDeviceToUserAccountPopup = () => {
        setShowAddNewDeviceToUserAccountPopup(!showAddNewDeviceToUserAccountPopup);
    }

    // If user is logged in show sidebar menu
    if(currentUser) {
        return (
            <div data-theme={theme} className="container-with-sidebar">

                {showNewTicketPopup && <NewTicketPopup handleClose={handleShowNewTicketPopup}/> }
                {showAddNewDeviceToUserAccountPopup && <AddNewDeviceToUserAccountPopup handleClose={handleShowAddNewDeviceToUserAccountPopup}/> }

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
                        <Route path="/user" exact element={<UserDashboard  showAddNewDeviceToUserAccountPopup={showAddNewDeviceToUserAccountPopup}/>} />
                        <Route path="/mod" exact element={<ModeratorDashboard />} />
                        <Route path="/admin" exact element={<AdminDashboard showNewTicketPopup={showNewTicketPopup}/>} />
                        {<Route path="/reset" exact element={<ResetPassword />} /> }
                        {<Route path="/resetemail" exact element={<ResetEmail />} /> }

                        {/*Sciezki dostepu usera*/}
                        {showUserDashboard && <Route path="/dashboard" exact element={<Navigate replace to="/user" />} /> }
                        {showUserDashboard && <Route path="/tickets" exact element={<UserTickets />} /> }
                        {showUserDashboard && <Route path="/tickets/:id" exact element={<TicketDetail />} /> }
                        {showUserDashboard && <Route path="/articles/:id" exact element={<ArticleDetail />} /> }
                        {showUserDashboard && <Route path="/articles" exact element={<UserArticles />} /> }

                        {/*Sciezki dostepu admina*/}
                        {showAdminDashboard && <Route path="/dashboard" exact element={<Navigate replace to="/admin" />} /> }
                        {showAdminDashboard && <Route path="/tickets" exact element={<AdminTickets />} /> }
                        {showAdminDashboard && <Route path="/users" exact element={<AdminUsers />} /> }
                        {showAdminDashboard && <Route path="/tickets/:id" exact element={<TicketDetail />} /> }
                        {showAdminDashboard && <Route path="/articles" exact element={<AdminArticles />} /> }
                        {showAdminDashboard && <Route path="/addArticle" exact element={<AddArticle />} /> }
                        {showAdminDashboard && <Route path="/articles/:id" exact element={<ArticleDetail />} /> }
                        {showAdminDashboard && <Route path="/reset" exact element={<ResetPassword />} /> }
                        {showAdminDashboard && <Route path="/addModerator" exact element={<AddModerator />} /> }

                        {/*Sciezki dostepu moderatora*/}
                        {showModeratorDashboard && <Route path="/dashboard" exact element={<Navigate replace to="/mod" />} /> }
                        {showModeratorDashboard && <Route path="/tickets" exact element={<AdminTickets />} /> }
                        {showModeratorDashboard && <Route path="/tickets/:id" exact element={<TicketDetail />} /> }
                        {showModeratorDashboard && <Route path="/articles" exact element={<AdminArticles />} /> }
                        {showModeratorDashboard && <Route path="/addArticle" exact element={<AddArticle />} /> }
                        {showModeratorDashboard && <Route path="/articles/:id" exact element={<ArticleDetail />} /> }
                        {showModeratorDashboard && <Route path="/reset" exact element={<ResetPassword />} /> }
                        
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
