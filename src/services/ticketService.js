import axios from "axios";
import authHeader from "./authHeader";


const API_URL = "https://resolved-api.herokuapp.com/api/tickets/";

const API_URL1 = "https://resolved-api.herokuapp.com/api/ticket/";

const getTickets = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const getAllTickets = () => {
    return axios.get(API_URL + "all", { headers: authHeader() });
};

const getTicketData = (id) => {
    return axios.get(API_URL + id , {headers: authHeader()});
}

const deleteTicket = (id) => {
    return axios.delete(API_URL + `${id}`, { headers: authHeader() });
};

const createTicket = (data) => {
       const requestOptions = {
        method: 'POST',
        headers:  authHeader() ,'Content-Type': 'multipart/form-date' ,
        body: data
    };

    return fetch('https://resolved-api.herokuapp.com/api/tickets/create', requestOptions).then(response => response.json())
    
}

const ticketReply = (content, id) => {
    return axios.post(API_URL + id + "/reply",
    {content},
    {headers: authHeader()})
}


const TicketService = {
    getTickets,
    getAllTickets,
    deleteTicket,
    createTicket,
    getTicketData,
    ticketReply
};

export default TicketService;
