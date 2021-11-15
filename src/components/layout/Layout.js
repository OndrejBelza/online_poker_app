import Footer from "./Footer";
import Header from "./header/Header";
import "./Layout.scss";
const Layout = ({ children }) => {
  return (
    <>
      <div className="page-content">
        <Header />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
