import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
 
const OnlyLoggedIn = ({ children, redirect = false }) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showUserDashboard, setShowUserDashboard] = useState(false);
    const [showModeratorDashboard, setShowModeratorDashboard] = useState(false);
    const [showAdminDashboard, setShowAdminDashboard] = useState(false);
    const navigate = useNavigate();
 
 
    useEffect(() => {
        const user = AuthService.getCurrentUser();
 
        if (user) {
            setCurrentUser(user);
            setShowUserDashboard(user.roles.includes("ROLE_USER"));
            setShowModeratorDashboard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminDashboard(user.roles.includes("ROLE_ADMIN"));
        } else {
            if(redirect) navigate(redirect)
        }
    }, []);
 
    if(currentUser) return children;
}   
 
export default OnlyLoggedIn;