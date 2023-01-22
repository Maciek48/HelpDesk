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

    let navigate = useNavigate()
    const checkBtn = useRef()
    const form = useRef()
    const [comment, setComment] = useState("")
    const [images, setImages] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [successful, setSuccessful] = useState(false)
    const [articleData, setArticleData] = useState([])
    const [error, setError] = useState("")
    const [formVisible, setFormVisible] = useState(false)
    const {id} = useParams()

    const onChangeHandler = (e) => {
        setComment(e.target.value)
    };

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title)
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description)
    };

    //function to get data from database
    const fetchData = async () => {
        setError("")

        try {
            await fetch(`https://resolved-api.herokuapp.com/api/articles/${id}`, { headers: authHeader() })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setArticleData(data)
                    return data
                }).then(async data => {
                    console.log(data);
                    //const fileNames = data.ticket.attachments.map(attachment => attachment.filename)
                    const imageBlobs = []

                    const blob = await fetch(`https://resolved-api.herokuapp.com/api/articles/${id}/image`, { headers: authHeader() })
                        .then(response => response.blob())
                    const reader = new FileReader()
                    reader.onloadend = function () {
                        imageBlobs.push(reader.result)
                       
                    }

                    reader.readAsDataURL(blob)

                    console.log(imageBlobs)
                    return imageBlobs
                }).then(imageBlobs => {

                    setImages(imageBlobs)
                })
        }

        catch (error) {
            setError(error.message)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="container-with-sidebar">
            <div className="srodek-tekst">
                Article information
            </div>
            <div className="parent">
                <div className="gora">
                    <strong>Article id:</strong> {articleData?.id} <br />
                    <strong>Headline:</strong> {articleData?.headline}
                </div>
                <div className="srodek">
                    <strong>Content:</strong> {articleData?.content} <br />

                </div>
                <div className="dol">
                    <strong>Created at:</strong> {articleData?.createdAt} <br />
                    <strong>Updated at:</strong> {articleData?.updatedAt} <br />
                </div>
            </div>
            <div className="parent2">
                <h3>Image: </h3>
                <div className="srodek">
                {images ? images.map((image, index) => {
                        //console.log(image)
                        return (
                            <div key={index} className="srodek">
                                <img src={image} alt="From user account" className="photo" />
                            </div>
                        )
                    }) : <p>Loading</p>}
                </div>
            </div>
        </div>
    )
};

export default TicketDetail;



