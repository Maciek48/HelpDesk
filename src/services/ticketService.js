import axios from "axios";
import authHeader from "./authHeader";


const API_URL = "https://resolved-api.herokuapp.com/api/tickets/";

const getTickets = () => {
    return axios.get(API_URL + "list", { headers: authHeader() });
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
/*    console.log(data);
    return fetch.post(API_URL + "create", {
        data
      }, { headers: 
            authHeader(), 
            'Content-Type' : "multipart/form-date"
        
       });*/
       const requestOptions = {
        method: 'POST',
        headers:  authHeader() ,'Content-Type': 'multipart/form-date' ,
        body: data
    };

    return fetch('https://resolved-api.herokuapp.com/api/tickets/create', requestOptions).then(response => response.json())
    
        
}


const TicketService = {
    getTickets,
    getAllTickets,
    deleteTicket,
    createTicket,
    getTicketData
};

export default TicketService;
