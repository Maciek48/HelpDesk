import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "https://resolved-api.herokuapp.com/api/test/";

const API_URL1 = "https://resolved-api.herokuapp.com/api/users/";

const API_URL2 = "https://resolved-api.herokuapp.com/api/auth/";


const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserDashboard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorDashboard = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminDashboard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getAllUsers = () => {
    return axios.get(API_URL1 + "all", { headers: authHeader() });
};

const deleteUser = (id) => {
    return axios.delete(API_URL1 + `${id}`, { headers: authHeader() });
};

const resetPassword = (password) => {
    return axios.put(API_URL2 + "reset", { password }, { headers: authHeader() });
};

const UserService = {
    getPublicContent,
    getUserDashboard,
    getModeratorDashboard,
    getAdminDashboard,
    getAllUsers,
    deleteUser,
    resetPassword
};

export default UserService;
