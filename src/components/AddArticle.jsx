import React, { useState, useRef,ChangeEvent } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea"
import CheckButton from "react-validation/build/button";
import { Alert, CircularProgress } from '@mui/material';
import ArticleService from "../services/articleService";

const required = (value) => {
  if (!value) {
    return (
      <Alert severity="warning" variant="outlined">This field is required!</Alert>
    );
  }
};

const AddArticle = props => {

  const form = useRef();
  const checkBtn = useRef();

  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [fileList, setFiles] = useState([]);
  //const [fileList, setFileList] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const files = fileList ? [...fileList] : [];

  

  const onChangeHeadline = (e) => {
    setHeadline(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeFiles = (e) => {
    setFiles(e.tagret.files);
  };
  
  const handleNewArticle = (e) => {
    e.preventDefault();
    console.log(form);

    const formData = new FormData();
    //console.log(files);
    files.forEach((file, i) => {
      formData.append(`file-${i}`, file,file.name);
    });

    setMessage("");
    setLoading(true);
    //const formTest = new FormData([form]);
    formData.append(`headline`, headline);
    formData.append(`content`, content);
    //formData.append('files', files);

    //for(const [k,v] of formData) {console.log(k,v)}
    //console.log(formData);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        ArticleService.createArtcile(formData).then(
        (response) => {
          setMessage(response.message);
          setSuccessful(true);
          setLoading(false);
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response &&
              error.response.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setSuccessful(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    

        <div className="form-container">
          <h1 className="title">Create new article.</h1>

          <form encType="multipart/form-data">
            <Form onSubmit={handleNewArticle} ref={form} >
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="subject">Headline</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="title"
                      value={headline}
                      onChange={onChangeHeadline}
                      validations={[required]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <Textarea
                      type="textarea"
                      className="form-control"
                      name="description"
                      value={content}
                      onChange={onChangeContent}
                      validations={[required]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="content">Send an image to article</label>
                    <Input
                      type="file"
                      accept="image/png, image/jpg"
                      className="form-control"
                      name="files"
                      //value={files}
                      onChange={onChangeFiles}
                      required
                    />
                  </div>


                  <div className="form-button-container">
                    <button>
                      {loading && (
                        <span><CircularProgress color="inherit" /></span>
                      )}
                      {!loading && (
                        <span>Create article</span>
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
  );
};

export default AddArticle;