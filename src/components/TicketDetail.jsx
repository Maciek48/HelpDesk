import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import authHeader from "../services/authHeader";

import '../css/components/ticketDetail.css'
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
        <div class="table-wrapper">
            <table class="fl-table">
                <thead>
                    <tr>
                        <th><strong>User information</strong></th>
                        <th><strong>Ticket information</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Email:  {ticketData?.email}</td>
                        <td>Title: {ticketData?.ticket?.title}</td>
                    </tr>
                    <tr>
                        <td>First name: {ticketData?.firstName}</td>
                        <td>Description: {ticketData?.ticket?.description}</td>
                    </tr>
                    <tr>
                        <td>Last name: {ticketData?.lastName}</td>
                        <td>Status: {ticketData?.status}</td>
                    </tr>
                    <tr>
                        <td>User id: {ticketData?.ticket?.userId}</td>
                        <td>Ticket id: {ticketData?.ticket?.id}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Created at: {ticketData?.ticket?.createdAt}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Updated at: {ticketData?.ticket?.updatedAt}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default TicketDetail;



