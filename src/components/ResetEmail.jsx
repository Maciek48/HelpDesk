import React, { useState, useRef } from "react";

import Input from "react-validation/build/input";
import { useNavigate } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import Form from "react-validation/build/form";
import UserService from "../services/userService";
import CheckButton from "react-validation/build/button";

const required = (value) => {
    if (!value) {
      return (
        <Alert severity="warning" variant="outlined">You have to write new email!</Alert>
      );
    }
  };

const ResetEmail = () => {

    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangePassword = (e) => {
        const email = e.target.value;
        setEmail(email);
      };

    const handleChangePassword = (e) => {
        e.preventDefauklt();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            UserService.chngeEmailorPassword(email).then(
              () => {
                navigate("/dashboard");
                window.location.reload();
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

    return(
        <div>
          <div className="form-container">
              Reset Email
            <Form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label htmlFor="password">Email</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={email}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="form-button-container">
                <button disabled={loading}>
                  {loading && (
                    <span><CircularProgress color="inherit"/></span>
                  )}
                  {!loading && (
                    <span>Reset Email</span>
                  )}
                </button>
              </div>
              
              {message && (
                <div className="form-group">
                    <Alert severity="error" variant="outlined">{message}</Alert>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </div>
    )
};

export default ResetEmail;