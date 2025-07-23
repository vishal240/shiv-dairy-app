import { Bookmark, Home, ShoppingBag, User } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToHome = () => {
    navigate("/home");
  };
  const navigateToCart = () => {
    navigate("/cart");
  };
  const navigateToFavourite = () => {
    navigate("/favourite");
  };
  const navigateToProfile = () => {
    navigate("/profile");
  };
  return (
    <>
      <div className="footer">
        <ul>
          <li
            onClick={navigateToHome}
            className={location.pathname === "/home" ? "active" : ""}
          >
            <Home></Home>
            <b>Home</b>
          </li>
          <li
            onClick={navigateToCart}
            className={location.pathname === "/cart" ? "active" : ""}
          >
            <ShoppingBag></ShoppingBag>
            <b>Cart</b>
          </li>
          <li
            onClick={navigateToFavourite}
            className={location.pathname === "/favourite" ? "active" : ""}
          >
            <Bookmark></Bookmark>
            <b>Favorite</b>
          </li>
          <li
            onClick={navigateToProfile}
            className={location.pathname === "/profile" ? "active" : ""}
          >
            <User></User>
            <b>Profile</b>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
