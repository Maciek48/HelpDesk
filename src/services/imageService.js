import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "https://resolved-api.herokuapp.com/api/image/";

const sendFile = (file) => {
    return axios.post(API_URL + "upload",{
        headers: authHeader(),
        Key: file });
}

const ImageService = {
    sendFile
};

export default ImageService;