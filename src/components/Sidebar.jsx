import React from "react";
import { Link } from "react-router-dom";
import { FiEdit3, FiHome, FiUser, FiArchive, FiHelpCircle, FiLogOut, FiUserPlus, FiPlus, FiTrello} from "react-icons/fi";
import { ImSun } from "react-icons/im";
import { BsFillMoonFill } from "react-icons/bs";


const Sidebar = props => {

    const sidebarClass = props.isOpen ? "sidebar" : "sidebar collapsed";

    return (
        <div className={sidebarClass} onMouseEnter={props.showSidebar}>
            <div className="logo-name-wrapper">
                <img src="logo.png" className="logo" alt="logo app" srcSet="" />
                <div className="logo-name">
                    <span className="logo-name__name">iSupport</span>
                </div>
                <button className="logo-name__button">
                    <i className="bx bx-arrow-from-right logo-name__icon" id="logo-name__icon"></i>
                </button>
            </div>

            <div className="sidebar-button" onClick={props.showNewTicketPopup}>
                <i><FiEdit3 className="sidebar-option-icon" /></i>
                <span className="sidebar-button-text">New Ticket</span>
                <span className="tooltip">New Ticket</span>
            </div>

            <ul className="sidebar-option-list">

                {/*przekierowanie gdy uzytkownik zalogowany i nacisniecie przycisku Home*/}
                {props.showUserDashboard && (
                    <Link to={"/user"} className="sidebar-option">
                        <i><FiHome className="sidebar-option-icon" /></i>
                        <span className="sidebar-option-text">Home</span>
                        <span className="tooltip">Home</span>
                    </Link>
                )}

                {props.showUserDashboard && (
                    <Link to={"/articles"} className="sidebar-option">
                        <i><FiTrello className="sidebar-option-icon" /></i>
                        <span className="sidebar-option-text">Articles</span>
                        <span className="tooltip">Articles</span>
                    </Link>
                )}


                {props.showModeratorDashboard && (
                    <Link to={"/mod"} className="sidebar-option">
                        <i><FiHome className="sidebar-option-icon" /></i>
                        <span className="sidebar-option-text">Home</span>
                        <span className="tooltip">Home</span>
                    </Link>
                )}

                {props.showAdminDashboard && (
                    <Link to={"/admin"} className="sidebar-option">
                        <i><FiHome className="sidebar-option-icon" /></i>
                        <span className="sidebar-option-text">Home</span>
                        <span className="tooltip">Home</span>
                    </Link>
                )}

                {props.showAdminDashboard && (
                    <Link to={"/users"} className="sidebar-option">
                        <i><FiUser className="sidebar-option-icon" /></i>
                        <span className="sidebar-option-text">Users</span>
                        <span className="tooltip">Users</span>
                    </Link>
                )}
                {props.showAdminDashboard && (
                    <Link to={"/addModerator"} className="sidebar-option">
                        <i><FiUserPlus className="sidebar-option-icon" /></i>
                        <span className="sidebar-option-text">Add User</span>
                        <span className="tooltip">Add Mod</span>
                    </Link>
                )}

                {props.showAdminDashboard && (
                    <Link to={"/addArticle"} className="sidebar-option">
                        <i><FiPlus className="sidebar-option-icon" /></i>
                        <span className="sidebar-option-text">Add Article</span>
                        <span className="tooltip">Add Article</span>
                    </Link>
                )}

                {props.showAdminDashboard && (
                    <Link to={"/articles"} className="sidebar-option">
                        <i><FiTrello className="sidebar-option-icon" /></i>
                        <span className="sidebar-option-text">Articles</span>
                        <span className="tooltip">Articles</span>
                    </Link>
                )}      


                <Link to={"/profile"} className="sidebar-option">
                    <i><FiUser className="sidebar-option-icon" /></i>
                    <span className="sidebar-option-text">Profile</span>
                    <span className="tooltip">Profile</span>
                </Link>

                <Link to={"/tickets"} className="sidebar-option">
                    <i><FiArchive className="sidebar-option-icon" /></i>
                    <span className="sidebar-option-text">Tickets</span>
                    <span className="tooltip">Tickets</span>
                </Link>

                <li className="sidebar-option">
                    <i><FiHelpCircle className="sidebar-option-icon" /></i>
                    <span className="sidebar-option-text">Help</span>
                    <span className="tooltip">Help</span>
                </li>
            </ul>

            <ul className="sidebar-options-list">
                <li className="sidebar-option" onClick={props.logOut}>
                    <i><FiLogOut className="sidebar-option-icon" /></i>
                    <span className="sidebar-option-text">Logout</span>
                    <span className="tooltip">Logout</span>
                </li>
            </ul>

            <ul className="sidebar-options-list">
                <li className="sidebar-option" onClick={props.changeTheme}>
                    <i>{props.currentTheme === "dark" ? (
                        <ImSun className="light sidebar-option-icon" />
                    ) : (
                        <BsFillMoonFill className="dark sidebar-option-icon" />
                    )}</i>
                    <span className="sidebar-option-text">Change theme</span>
                    <span className="tooltip">Change theme</span>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;