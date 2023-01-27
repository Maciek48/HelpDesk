import React, { useState, useEffect } from "react";
import authHeader from "../services/authHeader";
import UserService from "../services/userService";
import ArticleService from "../services/articleService";
import DeviceService from "../services/deviceService";
import EventBus from "../utils/EventBus";
import { Grid } from "@mui/material";
import '../css/components/userDashboard.css'

import AddIcon from '@mui/icons-material/Add';
import Modal from "./Modal";
import home from '../assets/home.png';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Iphone from '../assets/iphone-img.jpg'
import MacBook from '../assets/macBook-img.jpg'
import Watch from '../assets/watch.jpg'
import AirPods from '../assets/airpods.jpg'
import Ipad from '../assets/ipad.jpg'
import Mac from '../assets/mac.jpg'
import AppleTV from '../assets/appletv.jpeg'
import HomePod from '../assets/homepod.jpg'

const UserDashboard = () => {

  const [content, setContent] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [articlesData, setArticlesData] = useState([])
  const [deviceData, setDeviceData] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    UserService.getUserDashboard().then(
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

  }, []);

  useEffect(() => {
    DeviceService.getUserDevices().then(
      (response) => {
        setDeviceData(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setDeviceData(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h3 className="tab-title">Dashboard</h3>
      </Grid>
      <Grid item xs={12}>
        <div className="cards-container">
          <h1>Your devices:</h1>
          {deviceData?.devices?.map((device, index) => {
            if (device.type === "iPhone") {
              return (
                <div className="card" key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="250"
                        width="400"
                        image={Iphone}
                        alt="Iphone"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Name: {device.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              )
            } else if (device.type === "MacBook") {
              return (
                <div className="card" key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="250"
                        width="400"
                        image={MacBook}
                        alt="MacBook"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Name: {device.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              )
            } else if (device.type === "Watch") {
              return (
                <div className="card" key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="250"
                        width="400"
                        image={Watch}
                        alt="Watch"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Name: {device.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              )
            } else if (device.type === "AirPods") {
              return (
                <div className="card" key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="250"
                        width="400"
                        image={AirPods}
                        alt="AirPods"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Name: {device.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              )
            } else if (device.type === "iPad") {
              return (
                <div className="card" key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="250"
                        width="400"
                        image={Ipad}
                        alt="Ipad"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Name: {device.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              )
            } else if (device.type === "Mac") {
              return (
                <div className="card" key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="250"
                        width="400"
                        image={Mac}
                        alt="Mac"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Name: {device.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              )
            } else if (device.type === "AppleTV") {
              return (
                <div className="card" key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="250"
                        width="400"
                        image={AppleTV}
                        alt="AppleTV"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Name: {device.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              )
            } else if (device.type === "HomePod") {
              return (
                <div className="card" key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="250"
                        width="400"
                        image={HomePod}
                        alt="HomePod"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Name: {device.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              )
            }
          })}
        </div>
      </Grid>
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
      <Grid item xs={8}>
        <div className="parent2">
          <div className="srodek">
            <h1>5 Latest Articles</h1>
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

export default UserDashboard;
