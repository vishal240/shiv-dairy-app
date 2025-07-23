import React, { useState } from "react";
import OtpInput from "../components/inputs/otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const Pin = () => {
  const { login } = useAuth();
  const [pin, setPin] = useState("");
  const location = useLocation();
  const phone_number = location.state?.phone_number;
  const country_code = location.state?.country_code;
  const user_type = location.state?.user_type;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlePinChange = (value: string) => {
    setPin(value);
  };
  const onSubmit = () => {
    setLoading(true);
    ApiService.post("/user/loginCustomer", {
      phone_number,
      pin,
      user_type,
    })
      .then((res: any) => {
        console.log(res);
        toast.success(res.message);
        setLoading(false);
        login(res.data.token);
        navigate("/home");
      })
      .catch((err: any) => {
        console.log(err);
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="wrap2">
        <div className="px-4 pt-5">
          <h2 className="heading2">Enter your PIN number</h2>
          <p className="para2 mb-1">
            <b className="text-black d-block pt-1">
              {country_code} {phone_number}
            </b>
          </p>

          <div className="otp_npts">
            <OtpInput
              length={6}
              onChange={handlePinChange}
              className="otp-input-container"
              inputClassName="input"
            />
          </div>
        </div>
        <div className="px-4 pt-4 pb-4">
          <button
            className="fill"
            disabled={pin.length !== 6 || loading}
            onClick={onSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Pin;
