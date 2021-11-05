import { useEffect } from "react";
import "./App.css";
import useSocket from "./hooks/useSocket";

function App() {
  const [socket] = useSocket();
  useEffect(() => {
    // listen to connect event from server
    socket.on("connect", () => {
      console.log("connected to server");
    });

    // cleanup function that will handle closing connection to our server
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return <div className="App"></div>;
}

export default App;
