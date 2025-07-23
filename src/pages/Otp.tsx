import React, { useState } from "react";
import OtpInput from "../components/inputs/otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../services/api";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const phone_number = location.state?.phone_number;
  const country_code = location.state?.country_code;
  const user_type = location.state?.user_type;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };
  const onSubmit = () => {
    setLoading(true);
    ApiService.post("/user/verifyOtp", {
      phone_number,
      country_code,
      user_type,
      otp,
      fcm_token: "",
    })
      .then((res: any) => {
        console.log(res);
        toast.success(res.message);
        setLoading(false);
        navigate("/setpin", {
          state: {
            phone_number,
            country_code,
            user_type,
            token: res.data.token,
          },
        });
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
          <h2 className="heading2">Enter your OTP number</h2>
          <p className="para2 mb-1">
            We've sent the OTP number via sms to<br></br>
            <b className="text-black d-block pt-1">
              {country_code} {phone_number}
            </b>
          </p>

          <div className="otp_npts">
            <OtpInput
              length={6}
              onChange={handleOtpChange}
              className="otp-input-container"
              inputClassName="input"
            />
          </div>
        </div>
        <div className="px-4 pt-4 pb-4">
          <button
            className="fill"
            disabled={otp.length !== 6 || loading}
            onClick={onSubmit}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default Otp;
