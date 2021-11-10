import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../icons/logo.svg";
import * as Yup from 'yup';
import "../scss/Registration.scss";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Username must be at least 5 characters long")
    .max(16, "Username can't be more than 16 characters long")
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Required') 
    .min(8, 'Password must be must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required') 
});

const Registration = () => {

  // This will get socket from redux store now we can call our server
  // but we will not close our connection on navigation
  const socket = useSelector((state) => state.socket.socket);

  const registerUser = (credentials) => {
    // emits register event to server
    socket.emit("register", { 
      username: credentials.username, 
      email: credentials.email, 
      password: credentials.password,
      confirmPassword: credentials.confirmPassword
    });

    // listens for registration result from server
    socket.on("registration_result", (result) => {
      console.log("registration result", result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  return (
    <>
      <Container className="mainContainer">
        <Row className="rows">
          <Col className="columns">
            <h1 className="title">Online Poker</h1>
            <img className="logo" alt="logo" src={Logo}/>
          </Col>
          <Col className="columns">
            <div className="registrationContainer">
              <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={SignupSchema}
                onSubmit={values =>  registerUser(values)}
              >
              {({ errors, touched }) => (
                <Form className="registrationForm">
                    <Field name="username" placeholder="Enter username"/>
                    {errors.username && touched.username ? ( <span>{errors.username}</span> ) : <span></span>}
                    <Field type="email" name="email" placeholder="Enter email"/>
                    {errors.email && touched.email ? ( <span>{errors.email}</span> ) : <span></span>}
                    <Field type="password" name="password" placeholder="Enter password"/>
                    {errors.password && touched.password ? ( <span>{errors.password}</span> ) : <span></span>}
                    <Field type="password" name="confirmPassword" placeholder="Confirm password"/>
                    {errors.confirmPassword && touched.confirmPassword ? ( <span>{errors.confirmPassword}</span> ) : <span></span>}
                  <button type="submit">Register</button>
                </Form>
              )}
            </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Registration;
