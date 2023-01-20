import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "https://resolved-api.herokuapp.com/api/articles/";

// Get 5 latest headline articles
const get5LatestArticle = () => {
    return axios.get(API_URL + "recent", { headers: authHeader() });
};

// Get all articles
const getAllArticles = () => {
    return axios.get(API_URL + "all", { headers: authHeader() });
};

// Get article details
const getArticleDetail = (id) => {
    return axios.get(API_URL + id, { headers: authHeader() });
};

// Get image for article
const getArticleImage = (id) => {
    return axios.get(API_URL + id + "image", { headers: authHeader() });
};

// Add image to article
const addArticleImage = (id) => {
    return axios.post(API_URL + id + "image", { headers: authHeader() });
};

// Add new article
const addArticle = () => {
    return axios.post(API_URL + "upload", { headers: authHeader() });
};

// Remove article
const removeArticle = (id) => {
    return axios.delete(API_URL + id, { headers: authHeader() });
};

const ArticleService = {
    get5LatestArticle,
    getAllArticles,
    getArticleDetail,
    getArticleImage,
    addArticleImage,
    addArticle,
    removeArticle
};
  
export default ArticleService;