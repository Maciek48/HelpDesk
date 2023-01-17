import React, { useState, useRef,ChangeEvent } from "react";
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
  const [fileList, setFiles] = useState([]);
  //const [fileList, setFileList] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const files = fileList ? [...fileList] : [];

  

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const onChangeFiles = (e) => {
    const files = e.target.files;
    setFiles(files);
    console.log(files);
  }
  


  

  const handleNewTicket = (e) => {
    e.preventDefault();
    console.log(form);

    const formData = new FormData();
    console.log(files);
    files.forEach((file, i) => {
      formData.append(`file-${i}`, file,file.name);
    });

    setMessage("");
    setLoading(true);
    //const formTest = new FormData([form]);
    formData.append(`title`, title);
    formData.append(`description`, description);
    //formData.append('files', files);

    for(const [k,v] of formData) {console.log(k,v)}
    //console.log(formData);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      TicketService.createTicket(formData).then(
        (response) => {
          setMessage(response.message);
          if(response.message === "Error. Too many files selected!"){
            setSuccessful(false);
            setLoading(false);
          } else {
            setSuccessful(true);
          setLoading(false);
          }
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response &&
              error.response.message) ||
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
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="content">Sent a photo of problem, max 5 photos</label>
                    <Input
                      type="file"
                      accept="image/png, image/jpg"
                      className="form-control"
                      name="files"
                      //value={files}
                      onChange={onChangeFiles}
                      multiple
                    />
                  </div>


                  <div className="form-button-container">
                    <button onClick={handleNewTicket}>
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