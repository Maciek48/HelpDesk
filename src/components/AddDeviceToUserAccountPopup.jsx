import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import { Alert, CircularProgress } from '@mui/material';
import home from '../assets/home.png'
import '../css/components/Modal.css';
import DeviceService from '../services/deviceService';

const required = (value) => {
    if (!value) {
        return (
            <Alert severity="warning" variant="outlined">This field is required!</Alert>
        );
    }
};

const NewDevicePopup = ({ open, onClose }) => {

    const form = useRef();
    const checkBtn = useRef();

    const [type, setType] = React.useState('');
    const [name, setName] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    const onChangeType = (event) => {
        setType(event.target.value);
    };
    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const handleDevice = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            DeviceService.addDevice(type, name).then(
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
                <img src={home} alt='devices photos' class="popup-img"/>
                <div className='modalRight'>
                    <p className='closeBtn' onClick={onClose}>
                        X
                    </p>
                    <div className='content'>
                        <h1>Add new device</h1>

                        <Form onSubmit={handleDevice} ref={form}>

                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="firstName">Type</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            label="Type*"
                                            name="type"
                                            value={type}
                                            onChange={onChangeType}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lastName">Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="Name"
                                            value={name}
                                            onChange={onChangeName}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-button-container">
                                        <button>
                                            {loading && (
                                                <span><CircularProgress color="inherit" /></span>
                                            )}
                                            {!loading && (
                                                <span>Add device</span>
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
            </div>
        </div>
    );
};

export default NewDevicePopup;