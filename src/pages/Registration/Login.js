import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../../icons/logo.svg";
import Client from "../../utils/axiosClient";
import * as Yup from "yup";

import "./Registration.scss";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const [message, setMessage] = useState("");

  // This will get socket from redux store now we can call our server
  // but we will not close our connection on navigation
  const socket = useSelector((state) => state.socket.socket);

  const LoginUser = async (credentials) => {
    try {
      const response = await Client.post("login", credentials);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Container className="mainContainer">
        <Row className="rows">
          <Col className="columns">
            <h1 className="title">Online Poker</h1>
            <img className="logo" alt="logo" src={Logo} />
          </Col>
          <Col className="columns">
            <div className="registrationContainer">
              <p>{message}</p>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={SignupSchema}
                onSubmit={(values) => LoginUser(values)}>
                {({ errors, touched }) => (
                  <Form className="registrationForm">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email"
                    />
                    {errors.email && touched.email ? (
                      <span>{errors.email}</span>
                    ) : (
                      <span></span>
                    )}
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter password"
                    />
                    {errors.password && touched.password ? (
                      <span>{errors.password}</span>
                    ) : (
                      <span></span>
                    )}
                    <button type="submit">Login</button>
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

export default Login;
