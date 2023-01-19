import axios from "axios";
import authHeader from "./authHeader";


const API_URL = "https://resolved-api.herokuapp.com/api/tickets/";


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

const getImage = (id, filename) => {
    return axios.get(API_URL + id + "/attachment/" + filename, {headers: authHeader()});
}

const editTicket = (id, title, description) => {
    return axios.put(API_URL + id ,{title, description}, {headers: authHeader()});
}


const TicketService = {
    getTickets,
    getAllTickets,
    deleteTicket,
    createTicket,
    getTicketData,
    ticketReply,
    getImage,
    editTicket
};

export default TicketService;
