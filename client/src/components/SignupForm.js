// import react and useState
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
// import useMutation form apollo/client
import { useMutation } from "@apollo/client";
// import mutation
import { ADD_USER } from "../utils/mutations";
// import auth
import Auth from "../utils/auth";

// signupForm function
const SignupForm = () => {
  // useMutation for ADD_USER
  const [addUser, { error, loading }] = useMutation(ADD_USER);

  // set initial values for userFormData useState varibles
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // useState for validated
  const [validated, setValidated] = useState(false);

  // useState for showAlert
  const [showAlert, setShowAlert] = useState(false);

  // handleInputChange event for FormData
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // handleInputSubmit when submit click
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check form data
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({ variables: { ...userFormData } });
      Auth.login(data.addUser.token);
    } catch (err) {
      setShowAlert(true);
    }

    // setUserFromData values
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
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
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
      {error && <div>Sign up failed</div>}
    </>
  );
};

export default SignupForm;
