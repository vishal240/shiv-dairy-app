import Input from "../components/inputs/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../services/api";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import type { Address } from "../types/login";

const AuthAddress = () => {
  const locationData = useLocation();
  const address = locationData.state?.address;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const storeSchema = yup.object({
    fname: yup.string().required("First Name is required"),
    lname: yup.string().required("Last Name is required"),
    country_code: yup
      .string()
      .required("+91")
      .matches(/^\+\d{1,4}$/, "+91"),
    phone_number: yup
      .string()
      .required("Phone number is required")
      .matches(/^[+]?[\d\s\-()]{10,15}$/, "Please enter a valid phone number"),
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
    setValue,
  } = useForm<Address>({
    resolver: yupResolver(storeSchema as any),
  });
  const onSubmit = (data: Address) => {
    setLoading(true);
    if (address) {
      ApiService.post("/user/updateCustomerAddress", {
        ...data,
        address_id: address._id,
      })
        .then((res: any) => {
          console.log(res);
          setLoading(false);
          toast.success(res.message);
          navigate("/addressdetails");
        })
        .catch((err: any) => {
          console.log(err);
          toast.error(err.response.data.message);
          setLoading(false);
        });
    } else {
      ApiService.post("/user/addCustomerAddress", data)
        .then((res: any) => {
          console.log(res);
          setLoading(false);
          toast.success(res.message);
          navigate("/addressdetails");
        })
        .catch((err: any) => {
          console.log(err);
          toast.error(err.response.data.message);
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    if (address) {
      setValue("street_1", address.street_1);
      setValue("city", address.city);
      setValue("state", address.state);
      setValue("zip", address.zip);
      setValue("country", address.country);
      setValue("fname", address.fname);
      setValue("lname", address.lname);
      setValue("country_code", address.country_code);
      setValue("phone_number", address.phone_number);
    }
  }, [address]);
  return (
    <>
      <div className="container px-4 pt-5">
        <div className="row">
          <div className="col-12">
            <h2 className="head-2">Please Add Address</h2>
          </div>
          <div className="col-6 pt-3">
            <label className="lbl2"> First Name</label>
            <Input
              control={control}
              name="fname"
              label=""
              type="text"
              placeholder="Enter first name"
              inputMode="text"
              error={errors.fname?.message}
              disabled={loading}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="lbl2"> Last Name</label>
            <Input
              control={control}
              name="lname"
              label=""
              type="text"
              placeholder="Enter last name"
              inputMode="text"
              error={errors.lname?.message}
              disabled={loading}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="lbl2"> Country Code</label>
            <Input
              control={control}
              name="country_code"
              label=""
              type="text"
              placeholder="Enter country code"
              inputMode="tel"
              error={errors.country_code?.message}
              disabled={loading}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="lbl2"> Phone Number</label>
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

export default AuthAddress;
