import logo from "../assets/logo-dark.png";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="wrapper2">
        <div className="cont">
          <div></div>
          <div className="logo_con">
            <div className="logos_circle">
              <div className="logos">
                <img src={logo}></img>
              </div>
            </div>
            <h1 className="heading_one">
              Let's Buy{" "}
              <span>
                Quality<br></br>
                Products
              </span>{" "}
              From Us
            </h1>
          </div>
          <div className="padding_15">
            <button
              className="fill"
              onClick={() => navigate("/phone", { state: { role: "b2c" } })}
            >
              Customer
            </button>
            <button
              className="outline"
              onClick={() => navigate("/phone", { state: { role: "b2b" } })}
            >
              Wholesaler
            </button>
            <button className="normal">Beacome a Partner?</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
