import React, { useState } from "react";
import OtpInput from "../components/inputs/otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const SetPin = () => {
  const { login } = useAuth();
  const [pin, setPin] = useState("");
  const location = useLocation();
  const phone_number = location.state?.phone_number;
  const country_code = location.state?.country_code;
  const user_type = location.state?.user_type;
  const token = location.state?.token;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlePinChange = (value: string) => {
    setPin(value);
  };
  const onSubmit = () => {
    setLoading(true);
    ApiService.post(
      "/user/setCustomerPin",
      {
        confirm_pin: pin,
        pin,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res: any) => {
        console.log(res);
        toast.success(res.message);
        setLoading(false);
        navigate("/location", {
          state: {
            phone_number,
            country_code,
            user_type,
            token,
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
          <h2 className="heading2">Set your PIN number</h2>
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
            Set Pin
          </button>
        </div>
      </div>
    </>
  );
};

export default SetPin;
