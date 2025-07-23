import logo from "../assets/logo-light.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Splash = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, []);
  return (
    <>
      <div className="wrapper">
        <div>
          <img src={logo}></img>
        </div>
      </div>
    </>
  );
};

export default Splash;
