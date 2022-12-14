import React, { useState, useRef } from "react";
import Input from "react-validation/build/input";
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import Form from "react-validation/build/form";
import UserService from "../services/userService";
import CheckButton from "react-validation/build/button";

const required = (value) => {
    if (!value) {
      return (
        <Alert severity="warning" variant="outlined">You have to write new password!</Alert>
      );
    }
  };

const ResetPassword = () => {

    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };

    const handleChangePassword = (e) => {
        e.preventDefauklt();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            UserService.chngeEmailorPassword(password).then(
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
            <Form onSubmit={handleChangePassword}>
                Reset Password
                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}
                        />
                    </div>
                </div>

                {message && (
                    <div className="form-group">
                        <Alert severity="error" variant="outlined">{message}</Alert>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    )
};

export default ResetPassword;