import Input from "../components/inputs/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Login } from "../types/login";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ApiService from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Phone = () => {
  const location = useLocation();
  const role = location.state?.role;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const storeSchema = yup.object({
    country_code: yup
      .string()
      .required("+91")
      .matches(/^\+\d{1,4}$/, "+91"),
    phone_number: yup
      .string()
      .required("Phone number is required")
      .matches(/^[+]?[\d\s\-()]{10,15}$/, "Please enter a valid phone number"),
    user_type: yup.string(),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<Login>({
    resolver: yupResolver(storeSchema as any),
  });
  const onSubmit = (data: Login) => {
    setLoading(true);
    setValue("user_type", role);
    ApiService.post("/user/sendOtp", data)
      .then((res: any) => {
        console.log(res);
        setLoading(false);

        if (res.data.is_existing) {
          toast.success("Please enter your pin");
          navigate("/pin", {
            state: {
              phone_number: data.phone_number,
              country_code: data.country_code,
              user_type: data.user_type,
            },
          });
        } else {
          toast.success(res.message);
          navigate("/otp", {
            state: {
              phone_number: data.phone_number,
              country_code: data.country_code,
              user_type: data.user_type,
            },
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <div className="wrap2">
        <div className="px-4 pt-5">
          <h2 className="heading2">Get started</h2>
          <p className="para2">
            You can log in or make an account if you’re new
          </p>
          <div className="row">
            <div className="col-12">
              <label htmlFor="country_code">Enter your phone number</label>
            </div>
            <div className="col-3">
              <Input
                control={control}
                name="country_code"
                label=""
                type="text"
                placeholder="+91"
                inputMode="tel"
                error={errors.country_code?.message}
                disabled={loading}
              />
            </div>
            <div className="col-9">
              <Input
                control={control}
                name="phone_number"
                label=""
                type="text"
                placeholder="Enter phone number"
                inputMode="numeric"
                error={errors.phone_number?.message}
                disabled={loading}
              />
            </div>
          </div>
        </div>
        <div className="px-4 pt-4 pb-5">
          <button
            className="fill"
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Phone;
