import "./App.scss";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
