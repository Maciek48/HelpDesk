import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import authHeader from "../services/authHeader";
import { useNavigate } from 'react-router-dom';

import { Alert, CircularProgress } from '@mui/material';
import CheckButton from "react-validation/build/button";

import '../css/components/ticketDetail.css'
import TicketService from "../services/ticketService";
import Form from "react-validation/build/form";

const required = (value) => {
    if (!value) {
        return (
            <Alert severity="warning" variant="outlined">This field is required!</Alert>
        );
    }
};

function TicketDetail() {

    let navigate = useNavigate();
    const checkBtn = useRef();
    const form = useRef();
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [ticketData, setTicketData] = useState([]);
    const [error, setError] = useState("")
    const { id } = useParams();

    const onChangeHandler = (e) => {
        setComment(e.target.value);
    };

    //function to get data from database
    const fetchData = async () => {
        setError("")
        await fetch(`https://resolved-api.herokuapp.com/api/tickets/${id}`, { headers: authHeader() })
            .then(response => {

                return response.json()

            })
            .then(data => {
                setTicketData(data);

            })
            .catch(error => {
                setError(error.message)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    //function to save replay to database
    const handleReplay = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);
        console.log(comment)

        if (checkBtn.current.context._errors.length === 0) {
            console.log(comment, id)
            TicketService.ticketReply(comment, id).then(
                (response) => {
                    setMessage(response.data.message);
                    setLoading(false);
                    navigate("/tickets");
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);

                    setLoading(false);

                }
            );
        } else {
            setLoading(false);
        }
    };




    /*const result = [];
    ticketData.ticket.forEach(attachments => {
        result.push([attachments.id, attachments.filename, attachments.mimetype].join(', '));
    });
    console.log(result)*/

    return (
        <div className="container-with-sidebar">
            <div class="srodek-tekst">
                Ticket information
            </div>
            <div class="parent">
                <div class="gora">
                    <strong>User id:</strong> {ticketData?.ticket?.createdBy?.userId} <br />
                    <strong>Ticket id:</strong> {ticketData?.ticket?.ticketId} <br />
                    <strong>Status:</strong> {ticketData?.ticket?.status?.name}
                </div>
                <div class="srodek">
                    <strong>Title:</strong> {ticketData?.ticket?.title} <br />
                    <strong>Description:</strong> {ticketData?.ticket?.description}
                </div>
                <div class="dol">
                    <strong>Created by:</strong> {ticketData?.ticket?.createdBy?.firstName} {ticketData?.ticket?.createdBy?.lastName} <br />
                    <strong>Created at:</strong> {ticketData?.ticket?.createdAt} <br />
                    <strong>Updated at:</strong> {ticketData?.ticket?.updatedAt} <br />
                    <strong>Attachments: </strong>
                        {ticketData?.ticket?.attachments?.map((value, index) => {
                            return (
                                <ul key={index}><h5>Image id: { value.id }, File name: {value.filename}</h5></ul>
                        )
                    })}
                </div>
            </div>


            <div className="main-container">
                <Form ref={form}>

                    {!successful && (
                        <div>
                            <div className="comment-flexbox">
                                <h3 className="comment-text">Comments</h3>
                                <textarea
                                    placeholder="Write a comment to the Ticket"
                                    value={comment}
                                    onChange={onChangeHandler}
                                    className="input-box"
                                    validations={[required]}
                                    required
                                />
                            </div>



                            <div className="form1-button">
                                <button onClick={handleReplay}>
                                    {loading && (
                                        <span><CircularProgress color="inherit" /></span>
                                    )}
                                    {!loading && (
                                        <span>Add comment</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <Alert severity={successful ? "success" : "error"} variant="outlined">{message}</Alert>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
            {/*}
            <div className="main-container">
                <h1>AAAAAAAAAAAAA</h1>
                {ticketData?.ticket?.replies?.map((aaa, index) => {
                    return (
                        <div>

                            <section className="comment-author" >Created at: {aaa.content} </section>
                        </div>
                    )
                })}
            </div>*/}


        </div>


    )
};

export default TicketDetail;



