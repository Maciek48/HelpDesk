import React, { useState, useEffect } from "react";

import authHeader from "../services/authHeader";

import UserService from "../services/userService";
import ArticleService from "../services/articleService";
import EventBus from "../utils/EventBus";

import AddIcon from '@mui/icons-material/Add';

import { Grid } from "@mui/material";
import Modal from "./Modal";
import home from '../assets/home.png';

const ModeratorDashboard = () => {
  const [content, setContent] = useState("");
  
  const [articlesData, setArticlesData] = useState([])
  const [images, setImages] = useState([])
  const [openModal, setOpenModal] = useState(false)
  
  const [error, setError] = useState("")

  useEffect(() => {
    UserService.getModeratorDashboard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  useEffect(() => {
    ArticleService.get5LatestArticle().then(
      (response) => {
        setArticlesData(response.data);
        //console.log(articlesData)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setArticlesData(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
    //console.log(articlesData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

   //function to get 5 latest articles datas from database
   const fetchData = async () => {
    setError("")

    try {
      await fetch(`https://resolved-api.herokuapp.com/api/articles/recent`, { headers: authHeader() })
        .then(response => {
          return response.json()
        })
        .then(data => {
          setArticlesData(data)
          return data
        }).then(async data => {
          console.log(data);
          const articleIds = articlesData.map(article => article.id)
          const imagesBlobs = []
          articleIds.forEach(async articleId => {
            const blob = await fetch(`https://resolved-api.herokuapp.com/api/articles/${articleId}/image`, { headers: authHeader() })
              .then(response => response.blob())
            const reader = new FileReader()
            reader.onloadend = function () {
              imagesBlobs.push(reader.result)
            }
            reader.readAsDataURL(blob)
          })
          console.log(imagesBlobs)
          return imagesBlobs
        }).then(imageBlobs => {
          setImages(imageBlobs)
        })
    }
    catch (error) {
      setError(error.message)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h3 className="tab-title">Moderator Dashboard</h3>
      </Grid>
      {/*}
      <Grid item xs={12}>
        <div className="search-container">
          <h1 className="title">Search if your problem has been resolved.</h1>
          <form onSubmit="event.preventDefault();" role="search">
            <label htmlFor="search">Search for stuff</label>
            <input id="search" type="search" placeholder="Search..." autoFocus required />
            <button type="submit">Go</button>
          </form>
        </div>
      </Grid>
      {
        */
      }

      <Grid item xs={4}>
        <div className="button-continer">
          <img src={home} alt="Apple Products" />
          <button onClick={() => setOpenModal(true)} className="button-display">
            <AddIcon sx={{ fontSize: 80 }}></AddIcon>
          </button>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
          />
          <label className="label-for-add-button">Add Device</label>
        </div>

      </Grid>
      <Grid item xs={4}>
        <div className="button-container">
          Your devices:

        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="parent2">

          <div className="srodek">
            <h1>5 Latest Articles</h1>
            {images && articlesData ? images.map((image, index) => {
              return (
                <div className="article-container" key={index}>
    
                    {<img src={image} className="photo1" alt="Article" />}
                    <h3>{articlesData[index].headline}</h3>
                    <h3>{articlesData[index].id}</h3>

                </div>
              )
            }) : <p>Loading</p>}

            {articlesData.map((article, index) => {
              return (
                <div className="article-container" key={index}>
                  <h3>Article id: {article.id}</h3>
                  <h3>{article.headline}</h3>
              </div>
              )
              
            })}

          </div>
        </div>
      </Grid>
      <Grid item xs={4}>
        <h3>{ }</h3>
      </Grid>
    </Grid>
  );
};

export default ModeratorDashboard;
