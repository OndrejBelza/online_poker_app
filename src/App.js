import "./App.scss";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile";
import Login from "./pages/Registration/Login";
import Game from "./pages/Game/Game";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import getUser from "./utils/getUser";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/user/userSlice";
import { useEffect } from "react";

const tryFetchUser = (dispatch) => {
  getUser()
    .then((u) => {
      dispatch(setUser(u));
      return u;
    })
    .catch(() => {});
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    tryFetchUser(dispatch);
  }, [dispatch]);
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="game" element={<Game />} />
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
