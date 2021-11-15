import { Link } from "react-router-dom";
import Twemoji from "react-twemoji";
import "./PageNotFound.scss";
const PageNotFound = () => {
  return (
    <>
      <div className="error">
        <p className="display-2">404 page not found</p>
        <Twemoji options={{ className: "twemoji", size: "72x72" }}>🙃</Twemoji>
        <Link to="/" className="text-dark">
          Home
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
