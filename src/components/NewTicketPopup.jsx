import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea"
import CheckButton from "react-validation/build/button";
import { Alert, CircularProgress } from '@mui/material';
import TicketService from "../services/ticketService";

const required = (value) => {
    if (!value) {
      return (
        <Alert severity="warning" variant="outlined">This field is required!</Alert>
      );
    }
  };
 
const Popup = props => {

    const form = useRef();
    const checkBtn = useRef();
  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
      };
    
      const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
      };

      const handleNewTicket = (e) => {
        e.preventDefault();
    
        setMessage("");
        setLoading(true);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
          TicketService.createTicket(title, description).then(
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

    return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>

            <div className="form-container">
                <h1 className="title">Create new ticket.</h1>
                
                <Form onSubmit={handleNewTicket} ref={form}>
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
                        />
                    </div>

                    <div className="form-button-container">
                <button>
                  {loading && (
                    <span><CircularProgress color="inherit"/></span>
                  )}
                  {!loading && (
                    <span>Create ticket</span>
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
  );
};
 
export default Popup;