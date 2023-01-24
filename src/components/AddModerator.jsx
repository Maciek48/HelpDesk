import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { FormLabel, FormControlLabel, RadioGroup, Radio} from '@mui/material';
import { Alert, CircularProgress } from '@mui/material';
import AuthService from "../services/authService";

const required = (value) => {
  if (!value) {
    return (
      <Alert severity="warning" variant="outlined">This field is required!</Alert>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <Alert severity="error" variant="outlined">This is not a valid email!</Alert>
    );
  }
};

const validFirstName = (value) => {
  if (value.length < 2 || value.length > 15) {
    return (
      <Alert severity="info" variant="outlined">The first name must be between 2 and 15 characters.</Alert>
    );
  }
};

const validLastName = (value) => {
  if (value.length < 2 || value.length > 25) {
    return (
      <Alert severity="info" variant="outlined">The last name must be between 2 and 25 characters.</Alert>
    );
  }
};

const validPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <Alert severity="info" variant="outlined">The password must be between 6 and 40 characters.</Alert>
    );
  }
};

const AddModerator = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState('')
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeRoles = (e) => {
    setRoles([e.target.value]);
  }

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.registerMod(firstName, lastName, email, password, roles).then(
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

          setMessage(resMessage);
          setSuccessful(false);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">Create new moderator account.</h1>
      <Form onSubmit={handleRegister} ref={form}>

        {!successful && (
          <div>
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <Input
                type="text"
                className="form-control"
                name="firstName"
                value={firstName}
                onChange={onChangeFirstName}
                validations={[required, validFirstName]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <Input
                type="text"
                className="form-control"
                name="lastName"
                value={lastName}
                onChange={onChangeLastName}
                validations={[required, validLastName]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, validPassword]}
              />
            </div>
            <div className="form-group">
              
                <FormLabel id="roles-label">
                  Choose the role of the user
                </FormLabel>
                <RadioGroup 
                  name="roles-group" 
                  aria-labelledby="roles-group-label"
                  value={roles}
                  onChange={onChangeRoles}
                  defaultValue="admin"
                >
                  <FormControlLabel control={<Radio />} label='Admin' value='admin'/>
                  <FormControlLabel control={<Radio />} label='Moderator' value='moderator'/>
                  <FormControlLabel control={<Radio />} label='User' value='user'/>
                </RadioGroup>
            </div>
            <div className="form-button-container">
              <button>
                {loading && (
                  <span><CircularProgress color="inherit" /></span>
                )}
                {!loading && (
                  <span>Create account</span>
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
  );
};

export default AddModerator;
