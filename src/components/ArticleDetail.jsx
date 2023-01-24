import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import authHeader from "../services/authHeader";
import { useNavigate } from 'react-router-dom';
import '../css/components/ticketDetail.css'

function TicketDetail() {

    const [images, setImages] = useState([])
    const [articleData, setArticleData] = useState([])
    const [error, setError] = useState("")
    const {id} = useParams()

    const fetchImages = async (data) => {
        const imageBlobs = []
        const blob = await fetch(`https://resolved-api.herokuapp.com/api/articles/${id}/image`, { headers: authHeader() })
            .then(response => response.blob())
        var objectURL = URL.createObjectURL(blob);
        setImages([objectURL])
    }

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
                    fetchImages(data)
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



