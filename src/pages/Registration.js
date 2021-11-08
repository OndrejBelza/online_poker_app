import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Registration = () => {

  const [credentials, setCredentials] = useState(undefined);


  // This will get socket from redux store now we can call our server
  // but we will not close our connection on navigation
  const socket = useSelector((state) => state.socket.socket);
  useEffect(() => {
    if (credentials) {
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
  }, [credentials]);
  return (
    <>
      <h1>Registration</h1>
      <Formik
       initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
       validate={values => {
         const errors = {};
         if (!values.username) {
          errors.username = 'Required';
         } else if (!values.email) {
           errors.email = 'Required';
         } else if (!values.password) {
          errors.password = 'Required';
         } else if (values.password.length<8) {
          errors.password = 'Password must be at least 8 characters long';
         } else if (!values.confirmPassword) {
          errors.confirmPassword = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         } else if (values.confirmPassword !== values.password) {
           errors.confirmPassword = 'Passwords do not match'
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
           setCredentials(values);
           setSubmitting(false);
       }}
      >
       {({ isSubmitting }) => (
         <Form>
           <Field name="username" placeholder="Enter username"/>
           <ErrorMessage name="username" component="div" />
           <Field type="email" name="email" placeholder="Enter email"/>
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="password" placeholder="Enter password"/>
           <ErrorMessage name="password" component="div" />
           <Field type="password" name="confirmPassword" placeholder="Confirm password"/>
           <ErrorMessage name="confirmPassword" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
    </>
  );
};

export default Registration;
