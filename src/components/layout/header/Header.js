import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import axiosClient from "../../../utils/axiosClient";
import { setUser } from "../../../redux/user/userSlice";
const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const logout = async () => {
    const response = await axiosClient.post("logout");
    if (response.status === 200) dispatch(setUser(undefined));
  };

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand to="/" as={Link} className="header-text">
            Online Poker
          </Navbar.Brand>
          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {user ? (
                <>
                  <Nav.Link as={Link} to="leaderboard">
                    Leader board
                  </Nav.Link>
                  <Nav.Link>500000$</Nav.Link>
                  <Nav.Link as={Link} to="profile">
                    Settings
                  </Nav.Link>

                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="registration">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
