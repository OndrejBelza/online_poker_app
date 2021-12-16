import { Field, Form, Formik } from "formik";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import Logo from "../../icons/logo.svg";
import axiosClient from "../../utils/axiosClient";
import "./Registration.scss";
import { setUser } from "../../redux/user/userSlice";
import getUser from "../../utils/getUser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Username must be at least 5 characters long")
    .max(16, "Username can't be more than 16 characters long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Registration = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const registerUser = async (credentials) => {
    const response = await axiosClient.post("registration", {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      confirmPassword: credentials.confirmPassword,
    });

    //loads user data
    const user = await getUser();
    dispatch(setUser(user));

    //navigates to home
    navigate('/', { state:"reload" })
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
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => registerUser(values)}>
                {({ errors, touched }) => (
                  <Form className="registrationForm">
                    <Field name="username" placeholder="Enter username" />
                    {errors.username && touched.username ? (
                      <span>{errors.username}</span>
                    ) : (
                      <span></span>
                    )}
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
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <span>{errors.confirmPassword}</span>
                    ) : (
                      <span></span>
                    )}
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
