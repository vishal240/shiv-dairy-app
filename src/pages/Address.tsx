import Input from "../components/inputs/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../services/api";
import { toast } from "react-toastify";
import { useState } from "react";
import type { Address } from "../types/login";

const Address = () => {
  const locationData = useLocation();
  const token = locationData.state?.token;
  const phone_number = locationData.state?.phone_number;
  const country_code = locationData.state?.country_code;
  const user_type = locationData.state?.user_type;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const storeSchema = yup.object({
    street_1: yup.string().required("Street Address One is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip: yup
      .string()
      .required("Zip is required")
      .min(6, "Zip must be at least 6 characters")
      .max(6, "Zip must not exceed 6 characters"),
    country: yup.string().required("Country is required"),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Address>({
    resolver: yupResolver(storeSchema as any),
  });
  const onSubmit = (data: Address) => {
    setLoading(true);
    ApiService.post("/user/addCustomerAddress", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res: any) => {
        console.log(res);
        setLoading(false);
        toast.success(res.message);
        if (user_type === "b2c") {
          navigate("/notification", {
            state: {
              phone_number,
              country_code,
              user_type,
              token,
            },
          });
        }
        if (user_type === "b2b") {
          navigate("/businessdetails", {
            state: {
              phone_number,
              country_code,
              user_type,
              token,
            },
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="container px-4 pt-5">
        <div className="row">
          <div className="col-12">
            <h2 className="head-2">Please Add Address</h2>
          </div>
          <div className="col-12 pt-3">
            <label className="lbl2"> Street Address One</label>
            <Input
              control={control}
              name="street_1"
              label=""
              type="text"
              placeholder="Enter street address one"
              inputMode="text"
              error={errors.street_1?.message}
              disabled={loading}
            />
          </div>

          <div className="col-6 pt-3">
            <label className="lbl2"> City</label>
            <Input
              control={control}
              name="city"
              label=""
              type="text"
              placeholder="Enter city"
              inputMode="text"
              error={errors.city?.message}
              disabled={loading}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="lbl2"> State</label>
            <Input
              control={control}
              name="state"
              label=""
              type="text"
              placeholder="Enter state"
              inputMode="text"
              error={errors.state?.message}
              disabled={loading}
            />
          </div>

          <div className="col-6 pt-3">
            <label className="lbl2"> Zip</label>
            <Input
              control={control}
              name="zip"
              label=""
              type="text"
              placeholder="Enter zip"
              inputMode="numeric"
              error={errors.zip?.message}
              disabled={loading}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="lbl2"> Country</label>
            <Input
              control={control}
              name="country"
              label=""
              type="text"
              placeholder="Enter country"
              inputMode="text"
              error={errors.country?.message}
              disabled={loading}
            />
          </div>
          <div className="col-12 pt-4">
            <button
              className="fill"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
            >
              Save Address
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
