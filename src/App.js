import "./App.css";
import Home from "./pages/Home";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Registration/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Game from "./pages/Game/Game";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="game" element={<Game />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
