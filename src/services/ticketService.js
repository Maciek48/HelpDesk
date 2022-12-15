import axios from "axios";
import authHeader from "./authHeader";


const API_URL = "https://resolved-api.herokuapp.com/api/tickets";

const getTickets = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const getAllTickets = () => {
    return axios.get(API_URL + "/all", { headers: authHeader() });
};

const getTicketData = () => {
    return axios.get(API_URL + `/:id`, {headers: authHeader()});
}

const deleteTicket = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() });
};

const createTicket = (title, description) => {
    return axios.post(API_URL + "/create", {
        title,
        description,
      }, { headers: authHeader() });
}

const TicketService = {
    getTickets,
    getAllTickets,
    deleteTicket,
    createTicket,
    getTicketData
};

export default TicketService;
