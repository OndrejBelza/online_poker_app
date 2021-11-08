import "./App.css";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="registration" element={<Registration />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
