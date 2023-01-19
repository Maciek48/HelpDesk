import React, { useState, useRef } from 'react';

import home from '../assets/home.png'
import '../css/components/Modal.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Form from "react-validation/build/form";

import { CircularProgress, Alert } from '@mui/material';
import CheckButton from "react-validation/build/button";
import DeviceService from '../services/deviceService';
import { useEffect } from 'react';
import EventBus from "../utils/EventBus";
import authHeader from "../services/authHeader";

const Modal = ({ open, onClose }) => {

    const form = useRef();
    const checkBtn = useRef();

    const [type, setType] = useState('');
    const [types, setTypes] = useState([]);
    const [model, setModel] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [content, setContent] = useState("");
    const [error, setError] = useState("")

    const [typeArr, setTypeArr] = useState([]);


    /*const handleChange = (event) => {
        setType(event.target.value);
    };
    const handleModelChange = (event) => {
        setModel(event.target.value);
    };*/

    const fetchData = async () => {
        setError("")
        await fetch(`https://resolved-api.herokuapp.com/api/devices/all`, { headers: authHeader() })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setTypes(data);
                /*console.log(types)*/
            })
            .catch(error => {
                setError(error.message)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])
    /*
        useEffect(() => {
            DeviceService.getDevices().then(
                (response) => {
                    return response.json()
                })
                .then(
                (response) => {
                    setTypes(response.data);
                    console.log(types);
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
        }, []);*/



    const handleDevice = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            DeviceService.addDeviceToAccount(type).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    setLoading(false);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };


    if (!open) return null;
    return (
        <div onClick={onClose} className='overlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='modalContainer'
            >
                <img src={home} alt='devices photos' />
                <div className='modalRight'>
                    <p className='closeBtn' onClick={onClose}>
                        X
                    </p>
                    <div className='content'>
                        <h1>Add new device</h1>
                        

                        <Form ref={form}>
                            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                {/*<InputLabel id="demo-simple-select-required-label">Avible devices</InputLabel>*/}
                                <FormControl>
                                    <InputLabel id="type-label">Devices</InputLabel>
                                    <Select
                                        labelId="type-label"
                                        id="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        {types.map((item, index) => (
                                            <MenuItem key={index} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </FormControl>
                                

                            <div className='form-button'>
                                <button onClick={handleDevice}>
                                    {loading && (
                                        <span><CircularProgress color="inherit" /></span>
                                    )}
                                    {!loading && (
                                        <span>Save new device</span>
                                    )}
                                </button>
                            </div>
                            {message && (
                                <div className="form-group">
                                    <Alert severity={successful ? "success" : "error"} variant="outlined">{message}</Alert>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default Modal;
