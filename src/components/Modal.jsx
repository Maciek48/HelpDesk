import React, { useState, useRef } from 'react';

import home from '../assets/home.png'
import '../css/components/Modal.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Form from "react-validation/build/form";

import { CircularProgress,Alert } from '@mui/material';
import CheckButton from "react-validation/build/button";
import DeviceService from '../services/deviceService';


const Modal = ({ open, onClose }) => {

    const form = useRef();
    const checkBtn = useRef();

    const [type, setType] = React.useState('');
    const [model, setModel] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);


    const handleChange = (event) => {
        setType(event.target.value);
    };
    const handleModelChange = (event) => {
        setModel(event.target.value);
    };

    const handleDevice = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            DeviceService.addDevice(type, model).then(
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

                        <Form onSubmit={handleDevice} ref={form}>
                            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={type}
                                    label="Type *"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Mac"}>Mac</MenuItem>
                                    <MenuItem value={"iPad"}>iPad</MenuItem>
                                    <MenuItem value={"iPhone"}>iPhone</MenuItem>
                                    <MenuItem value={"Watch"}>Watch</MenuItem>
                                    <MenuItem value={"AirPods"}>AirPods</MenuItem>
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                            {type === "Mac" && (
                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-required-label">Model</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={model}
                                        label="Model *"
                                        onChange={handleModelChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Macbook Pro"}>Macbook Pro</MenuItem>
                                        <MenuItem value={"Macbook Air"}>Macbook Air</MenuItem>
                                        <MenuItem value={"iMac"}>iMac</MenuItem>
                                        <MenuItem value={"Mac mini"}>iMac</MenuItem>
                                        <MenuItem value={"Mac Studio"}>Mac Studio</MenuItem>
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            )}
                            {type === "iPad" && (
                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-required-label">Model</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={model}
                                        label="Model *"
                                        onChange={handleModelChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"iPad Pro"}>iPad Pro</MenuItem>
                                        <MenuItem value={"iPad Air"}>iPad Air</MenuItem>
                                        <MenuItem value={"iPad"}>iPad</MenuItem>
                                        <MenuItem value={"iPad Mini"}>iPad Mini</MenuItem>
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            )}
                            {type === "iPhone" && (
                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-required-label">Model</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={model}
                                        label="Model *"
                                        onChange={handleModelChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"iPhone 14 Pro"}>iPhone 14 Pro</MenuItem>
                                        <MenuItem value={"iPhone 14"}>iPhone 14</MenuItem>
                                        <MenuItem value={"iPhone 13"}>iPhone 13</MenuItem>
                                        <MenuItem value={"iPhone SE"}>iPhone SE</MenuItem>
                                        <MenuItem value={"iPhone 12 Pro"}>iPhone 12 Pro</MenuItem>
                                        <MenuItem value={"iPhone 12"}>iPhone 12</MenuItem>
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            )}
                            {type === "Watch" && (
                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-required-label">Model</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={model}
                                        label="Model *"
                                        onChange={handleModelChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Apple Watch Ultra"}>Apple Watch Ultra</MenuItem>
                                        <MenuItem value={"Apple Watch Series 8"}>Apple Watch Series 8</MenuItem>
                                        <MenuItem value={"Apple Watch SE"}>Apple Watch Series SE</MenuItem>
                                        <MenuItem value={"Apple Watch Series 7"}>Apple Watch Series 7</MenuItem>
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            )}
                            {type === "AirPods" && (
                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-required-label">Model</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={model}
                                        label="Model *"
                                        onChange={handleModelChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"AirPods 2nd Generation"}>AirPods 2nd generation</MenuItem>
                                        <MenuItem value={"AirPods 3rd Generation"}>AirPods 3rd generation</MenuItem>
                                        <MenuItem value={"AirPods Pro 2nd Generation"}>AirPods Pro 2nd Generation</MenuItem>
                                        <MenuItem value={"AirPods Pro 1st Generation"}>AirPods Pro 1st Generation</MenuItem>
                                        <MenuItem value={"AirPods Max"}>AirPods Max</MenuItem>
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            )}

                            <div className='form-button'>
                                <button >
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
