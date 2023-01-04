import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea"
import CheckButton from "react-validation/build/button";
import { Alert, CircularProgress } from '@mui/material';
import TicketService from "../services/ticketService";
import ImageService from "../services/imageService";

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
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
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

  const onChangeFile1 = (e) => {
    const file1 = e.target.value;
    setFile1(file1);
  }

  const onChangeFile2 = (e) => {
    const file2 = e.target.value;
    setFile2(file2);
  }

  const onChangeFile3 = (e) => {
    const file3 = e.target.value;
    setFile3(file3);
  }

  const handleNewTicket = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      TicketService.createTicket(title, description, file1, file2, file3).then(
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

          <form encType="multipart/form-data">
            <Form onSubmit={handleNewTicket} ref={form} >
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

                  <div className="form-group">
                    <label htmlFor="content">Sent a photo of problem</label>
                    <Input
                      type="file"
                      accept="image/png, image/jpg"
                      className="form-control"
                      name="file1"
                      value={file1}
                      onChange={onChangeFile1}
                    />
                    <Input
                      type="file"
                      accept="image/png, image/jpg"
                      className="form-control"
                      name="file2"
                      value={file2}
                      onChange={onChangeFile2}
                    />
                    <Input
                      type="file"
                      accept="image/png, image/jpg"
                      className="form-control"
                      name="file3"
                      value={file3}
                      onChange={onChangeFile3}
                    />
                  </div>


                  <div className="form-button-container">
                    <button>
                      {loading && (
                        <span><CircularProgress color="inherit" /></span>
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
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Popup;