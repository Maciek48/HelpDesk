//import { Card } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
//import authHeader from "../services/authHeader";
//import EventBus from "../utils/EventBus";

//import TicketService from "../services/ticketService";
//import axios from "axios";
import authHeader from "../services/authHeader";

const API_URL = "https://resolved.herokuapp.com/api/tickets/:id";


function TicketDetail() {

    const [ticketData, setTicketData] = useState([]);
    const [error, setError] = useState("")

    const {id} = useParams();
    console.log(id);

    const fetchData = async () => {
        setError("")
        const response = await fetch(`https://resolved-api.herokuapp.com/api/tickets/${id}`, { headers: authHeader() })
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
            First name: {ticketData?.firstName}<br/>
            Last name: {ticketData?.lastName}<br/>
            User id: {ticketData?.ticket?.userId}<br/>
            <br/>

            Ticket information:<br/>
            Created at: {ticketData?.ticket?.createdAt}<br/>
            Updated at: {ticketData?.ticket?.updatedAt}<br/>
            Title: Id: {ticketData?.ticket?.title}<br/>
            Description: {ticketData?.ticket?.description}<br/>
            Id: {ticketData?.ticket?.id}<br/>
            Status: {ticketData?.status}<br/>
        </div>
    )
};

export default TicketDetail;



