import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "https://resolved-api.herokuapp.com/api/articles/";

// Get 5 latest headline articles
const get5LatestArticle = () => {
    return axios.get(API_URL + "recent", { headers: authHeader() });
};

// Get all articles
const getAllArticles = () => {
    return axios.get(API_URL, { headers: authHeader() });
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
const createArticle = (data) => {
    const requestOptions = {
     method: 'POST',
     headers:  authHeader() ,'Content-Type': `multipart/form-date` ,
     body: data
 };

 return fetch('https://resolved-api.herokuapp.com/api/articles/create', requestOptions).then(response => response.json());
 
}

/*const createArticle = (data) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(API_URL + "create", 
    {
        data
    },
    {
        headers:{
            'Content-Type': 'multipart/form-date',
            'x-access-token': user.accessToken
        }
        
    });
};*/

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
    createArticle,
    removeArticle
};
  
export default ArticleService;