import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Layout.scss";
const Header = () => {
  return (
    <Container className="header">
      <p>This is header component</p>
      <ul>
        <li>
          <Link to="/registration">registration</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/">home</Link>
        </li>
      </ul>
    </Container>
  );
};

export default Header;
