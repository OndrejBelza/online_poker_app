import React, { useEffect } from "react";
import { useSelector } from "react-redux";
const Registration = () => {
  // This will get socket from redux store now we can call our server
  // but we will not close our connection on navigation
  const socket = useSelector((state) => state.socket.socket);
  useEffect(() => {
    // emits register event to server
    socket.emit("register", { username: "test", password: "example" });

    // listens for registration result from server
    socket.on("registration_result", (result) => {
      console.log("registration result", result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1>Registration</h1>
    </>
  );
};

export default Registration;
