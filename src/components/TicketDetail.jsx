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
                console.log(data)
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
        <div>
            <div className="table-wrapper">

                <table className="fl-table">
                    <thead>
                        <tr>
                            <th><strong>User information</strong></th>
                            <th><strong>Ticket information</strong></th>
                            <th><strong>Attachments</strong></th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>First name: {ticketData?.ticket?.createdBy?.firstName}</td>
                            <td>Title: {ticketData?.ticket?.title}</td>
                            {ticketData?.ticket?.attachments?.map((value, index) => {
                                return (
                                    <><td>Image id: {value.id}, File name: {value.filename}</td></>
                                )
                            })}
                        </tr>
                        <tr>
                            <td>Last name: {ticketData?.ticket?.createdBy?.lastName}</td>
                            <td>Description: {ticketData?.ticket?.description}</td>
                        </tr>
                        <tr>
                            <td>User id: {ticketData?.ticket?.createdBy?.userId}</td>
                            <td>Status: {ticketData?.ticket?.status?.name}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Ticket id: {ticketData?.ticket?.ticketId}</td>
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
{/*}
            <div className="main-container">

                <div className="comment-flexbox">
                    <h3 className="comment-text">Comments</h3>
                    <textarea
                        placeholder="Write a comment to the Ticket"
                        value={comment}
                        onChange={onChangeHandler}
                        className="input-box"
                    />

                    <br />

                    <div className="form1-button">
                        <button disabled={loading} >
                            {loading && (
                                <span><CircularProgress color="inherit" /></span>
                            )}
                            {!loading && (
                                <span>Comment</span>
                            )}
                        </button>
                    </div>




                </div>
                            </div>{*/}
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


        </div>


    )
};

export default TicketDetail;



