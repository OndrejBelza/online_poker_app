import { io } from "socket.io-client";

const useSocket = () => {
  const serverURL = process.env.REACT_APP_SERVER_URL;
  console.log("connecting to socket.io server on", serverURL);
  const socket = io(serverURL, {
    withCredentials: true,
  });

  return [socket];
};

export default useSocket;
