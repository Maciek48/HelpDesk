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
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);

    const [loading, setLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(true);
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

        try {
            await fetch(`https://resolved-api.herokuapp.com/api/tickets/${id}`, { headers: authHeader() })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setTicketData(data)
                    return data;
                }).then(async data => {
                    console.log(data);
                    const fileNames = data.ticket.attachments.map(attachment => attachment.filename);
                    const imagesBlobs = [];
                    fileNames.forEach(async fileName => {
                        const blob = await fetch(`https://resolved-api.herokuapp.com/api/tickets/${id}/attachment/${fileName}`, { headers: authHeader() })
                            .then(response => response.blob());
                        const reader = new FileReader();
                        reader.onloadend = function () {
                            imagesBlobs.push(reader.result);
                        }
                        reader.readAsDataURL(blob);
                    })
                    return imagesBlobs;
                }).then(imageBlobs => {
                    setImages(imageBlobs);
                })
        }

        catch (error) {
            setError(error.message)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])


    //function to save replay to database
    const handleReplay = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

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

    function saveAttachment(e) {
        setFiles(current => [...current, e])

    }



    /*const result = [];
    ticketData.ticket.forEach(attachments => {
        result.push([attachments.id, attachments.filename, attachments.mimetype].join(', '));
    });
    console.log(result)*/

    return (
        <div className="container-with-sidebar">
            <div className="srodek-tekst">
                Ticket information
            </div>
            <div className="parent">
                <div className="gora">
                    <strong>User id:</strong> {ticketData?.ticket?.createdBy?.userId} <br />
                    <strong>Ticket id:</strong> {ticketData?.ticket?.ticketId} <br />
                    <strong>Status:</strong> {ticketData?.ticket?.status?.name}
                </div>
                <div className="srodek">
                    <strong>Title:</strong> {ticketData?.ticket?.title} <br />
                    <strong>Description:</strong> {ticketData?.ticket?.description}
                </div>
                <div className="dol">
                    <strong>Created by:</strong> {ticketData?.ticket?.createdBy?.firstName} {ticketData?.ticket?.createdBy?.lastName} <br />
                    <strong>Created at:</strong> {ticketData?.ticket?.createdAt} <br />
                    <strong>Updated at:</strong> {ticketData?.ticket?.updatedAt} <br />
                    <strong>Attachments: </strong>
                    {ticketData?.ticket?.attachments?.map((value, index) => {
                        //saveAttachment(value.filename)
                        return (
                            <ul key={index}><h5>Image id: {value.id}, File name: {value.filename}</h5></ul>
                        )
                    })}
                </div>
            </div>
            <div className="main-container">
                Images: <br />
                {images ? images.map((image, index) => {
                    console.log(image)
                    //saveAttachment(value.filename)
                    
                    return (
                        <div key={index} >
                            <img src={image} />
                        </div>

                        /*<ul key={index}><h5>Image id: { value.id }, File name: {value.filename}  </h5></ul>*/
                    )
                }): <p>Loading</p>}

               


            </div>
            <div className="main-container">
                <Form onSubmit={handleReplay} ref={form}>
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
                                <button>
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

            {ticketData?.ticket?.replies?.map((reply, index) =>

                <div className="parent1" key={index}>
                    <div className="gora">
                        <strong>Author: {reply.user.firstName} {reply.user.lastName}</strong> <br />
                        {reply.user.roles.map((role, index) => {
                            return (
                                <strong >Role: {role.name}</strong>
                            )
                        }
                        )}

                        <strong>Ticket Id: {reply.id}</strong>  <br />
                        <strong>Created at: {reply.createdAt}</strong>
                    </div>
                    <div className="srodek">
                        <strong>Content: {reply.content}</strong>
                    </div>
                </div>
            )}

        </div>
    )
};

export default TicketDetail;



