// import react, useState , useEffect
import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
// import apollo/client
import { useMutation } from "@apollo/client";
// import mutations
import { LOGIN_USER } from "../utils/mutations";
// import auth
import Auth from "../utils/auth";

//  loginform function
const LoginForm = () => {
  // userFormData state variable with inital values
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  // state variable validated with inital value false
  const [validated] = useState(false);
  // state variable showAltert with initial value
  const [showAlert, setShowAlert] = useState(false);
  // deifne useMutation for login form
  const [login, { error }] = useMutation(LOGIN_USER);

  // applying useEffect function for Alert message
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  //  HandleInputChange event for form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // handleFormsubmit event when submit click
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      // check user login with user token
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    // setUserformData values
    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
      {/*  if error occur show login failed */}
      {error && <div>Login failed</div>}
    </>
  );
};

export default LoginForm;
