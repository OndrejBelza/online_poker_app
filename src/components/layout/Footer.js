import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="bg-white">
        <Container className="d-flex justify-content-around my-2 ">
          <span>Online Poker 2021</span>
          <Link to="/support " className="text-decoration-none text-dark">
            Support
          </Link>
        </Container>
      </div>
    </>
  );
};
export default Footer;
