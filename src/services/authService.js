import axios from "axios";

const API_URL = "https://resolved-api.herokuapp.com/api/auth/";

const register = (firstName, lastName, email, password) => {
  return axios.post(API_URL + "signup", {
    firstName,
    lastName,
    email,
    password,
  });
};

const registerMod = (firstName, lastName, email, password, roles) => {
  return axios.post(API_URL + "signup", {
    firstName,
    lastName,
    email,
    password,
    roles,
  });
};

const login = (email, password) => {
  return axios.post(API_URL + "signin", {
    email,
    password,
  })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  registerMod
};

export default AuthService;
