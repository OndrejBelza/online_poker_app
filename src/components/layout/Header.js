import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <p>This is header component</p>
      <ul>
        <li>
          <Link to="/registration">registration</Link>
        </li>
        <li>
          <Link to="/">home</Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
