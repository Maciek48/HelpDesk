import { Card } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
//import authHeader from "../services/authHeader";
import EventBus from "../utils/EventBus";

import TicketService from "../services/ticketService";
import axios from "axios";
import authHeader from "../services/authHeader";

const API_URL = "https://isupportapi.herokuapp.com/tickets/";


function TicketDetail() {

    const [ticketData, setTicketData] = useState([]);
    const [error, setError] = useState("")

    const {id} = useParams();
    console.log(id);

    const fetchData = async () => {
        setError("")
        const response = await fetch(`https://isupportapi.herokuapp.com/tickets/details/${id}`, { headers: authHeader() })
            .then(response => {
                if(response.ok){
                    return response.json()
                }
                else{
                    throw new Error("Sorry something went wrong")
                }
            })
            .then(data => {
                setTicketData(data);
                console.log(data)
            })
            .catch(error => {
                setError(error.message)
            })
    }

    useEffect( () => {
        fetchData()
    }, [])

    

    return (
        <div>
            <p>User information:</p>
            Email:  {ticketData?.email}<br/>
            User id: {ticketData?.ticket?.userId}<br/>

            <br/>
            <p>Ticket information:</p>
            Ticket id: {ticketData?.ticket?.id}<br/>
            Title: {ticketData?.ticket?.title}<br/>
            Description: {ticketData?.ticket?.description}<br/>

        </div>
    )
};

export default TicketDetail;



