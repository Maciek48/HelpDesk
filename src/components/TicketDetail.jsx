import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import authHeader from "../services/authHeader";
import { useNavigate } from 'react-router-dom';

import { Alert, CircularProgress } from '@mui/material';
import CheckButton from "react-validation/build/button";

import '../css/components/ticketDetail.css'
import TicketService from "../services/ticketService";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea"

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
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [ticketData, setTicketData] = useState([]);
    const [error, setError] = useState("")
    const [formVisible, setFormVisible] = useState(false);
    const { id } = useParams();

    const onChangeHandler = (e) => {
        setComment(e.target.value);
    };

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
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
                    setSuccessful(true);
                    setTimeout(() => {
                        navigate("/tickets");
                    }, 3000);
                    //navigate("/tickets");
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                    setLoading(false);

                }
            );
        } else {
            setLoading(false);
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        // code to handle the form submission goes here
    }

    const handleEditTicket = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            TicketService.editTicket(id, title, description).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    setLoading(false);
                    setTimeout(() => {
                        navigate("/tickets");
                    }, 6000);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                    setLoading(false);

                }
            );
        } else {
            setLoading(false);
        }
    };


    return (
        <div className="container-with-sidebar">
            <button className="btn" onClick={() => setFormVisible(!formVisible)}>Edit Ticket</button>

            <form onSubmit={handleSubmit} style={{ display: formVisible ? "block" : "none" }}>
                <div className="form-container">
                    <Form ref={form} >
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="subject">Title</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={title}
                                        onChange={onChangeTitle}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Description</label>
                                    <Textarea
                                        type="textarea"
                                        className="form-control"
                                        name="description"
                                        value={description}
                                        onChange={onChangeDescription}
                                        validations={[required]}
                                        maxlength="255"
                                    />
                                </div>
                                <div className="form-button-container">
                                    <button onClick={handleEditTicket}>
                                        {loading && (
                                            <span><CircularProgress color="inherit" /></span>
                                        )}
                                        {!loading && (
                                            <span>Edit ticket</span>
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
            </form>
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
            <div className="parent2">
                <h3>Images: </h3>
                <div className="srodek">
                    {images ? images.map((image, index) => {
                        console.log(image)
                        //saveAttachment(value.filename)

                        return (
                            <div key={index} className="srodek">
                                <img src={image} alt="photo from database" className="photo" />
                            </div>

                            /*<ul key={index}><h5>Image id: { value.id }, File name: {value.filename}  </h5></ul>*/
                        )
                    }) : <p>Loading</p>}
                </div>





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
                        <br />
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



