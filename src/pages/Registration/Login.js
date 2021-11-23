import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Logo from "../../icons/logo.svg";
import { setUser } from "../../redux/user/userSlice";
import Client from "../../utils/axiosClient";
import getUser from "../../utils/getUser";
import "./Registration.scss";
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const [message] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const LoginUser = async (credentials) => {
    try {
      await Client.post("login", credentials);

      //loads user data
      const user = await getUser();
      dispatch(setUser(user));

      //navigates to home
      navigate("/");
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
