import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.scss";
const Header = () => {
  const [loggedIn] = useState(false);

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
              <Nav.Link>Leader board</Nav.Link>
              <Nav.Link>500000$</Nav.Link>
              <Nav.Link>Settings</Nav.Link>
              {loggedIn ? (
                <>
                  <Nav.Link>Settings</Nav.Link>

                  <Nav.Link>Logout</Nav.Link>

                  {/* <Navbar.Text>Signed in as: </Navbar.Text>
                  <Nav.Link as={Link} to="profile">
                    Mark Otto
                  </Nav.Link> */}
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
