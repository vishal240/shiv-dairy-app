import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import type { Businessdetails } from "../types/login";
import Input from "../components/inputs/input";
import { toast } from "react-toastify";
import ApiService from "../services/api";
import FileInput from "../components/inputs/FileInput";
import { ChevronLeft } from "react-feather";

const AuthBusinessdetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const storeSchema = yup.object({
    business_id: yup.string().optional(),
    business_name: yup.string().required("Business Name is required"),
    business_email: yup
      .string()
      .required("Business Email is required")
      .email("Invalid email"),
    business_country_code: yup
      .string()
      .required("Country code is required")
      .matches(/^\+\d{1,4}$/, "+91"),
    business_phone: yup
      .string()
      .required("Business Phone is required")
      .min(10, "Phone number must be at least 10 characters")
      .max(10, "Phone number must not exceed 10 characters"),
    alternative_email: yup.string().optional().email("Invalid email"),
    alternative_country_code: yup
      .string()
      .optional()
      .matches(/^\+\d{1,4}$/, "+91"),
    alternative_phone: yup
      .string()
      .optional()
      .min(10, "Phone number must be at least 10 characters")
      .max(10, "Phone number must not exceed 10 characters"),
    gstin: yup.string().required("GSTIN is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip: yup
      .string()
      .required("Zip is required")
      .min(6, "Zip must be at least 6 characters")
      .max(6, "Zip must not exceed 6 characters"),
    country: yup.string().required("Country is required"),
    pan_card: yup.mixed().optional(),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<Businessdetails>({
    resolver: yupResolver(storeSchema) as any,
  });

  const onSubmit = (data: Businessdetails) => {
    console.log(data);
    const formData = new FormData();
    formData.append("business_id", data.business_id);
    formData.append("business_name", data.business_name);
    formData.append("business_email", data.business_email);
    formData.append("business_phone", data.business_phone);
    formData.append("business_country_code", data.business_country_code);
    formData.append(
      "alternative_country_code",
      data.alternative_country_code || ""
    );
    formData.append("alternative_email", data.alternative_email || "");
    formData.append("alternative_phone", data.alternative_phone || "");
    formData.append("gst_number", data.gstin);
    formData.append(
      "address",
      JSON.stringify({
        street_1: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zip: data.zip,
      })
    );
    if (data.pan_card && data.pan_card.length > 0) {
      formData.append("document", data.pan_card[0]);
    }
    setLoading(true);
    ApiService.post("/user/updateBusiness", formData)
      .then((res: any) => {
        console.log(res);
        setLoading(false);
        toast.success(res.message);
        navigate("/profile");
      })
      .catch((err: any) => {
        console.log(err);
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    getBusinessDetails();
  }, []);
  const getBusinessDetails = () => {
    ApiService.get("/user/getBusinessDetails")
      .then((res: any) => {
        console.log(res);
        setValue("business_id", res?.data?.business?._id);
        setValue("business_name", res?.data?.business?.business_name);
        setValue("business_email", res?.data?.business?.business_email);
        setValue("business_phone", res?.data?.business?.business_phone);
        setValue(
          "business_country_code",
          res?.data?.business?.business_country_code
        );
        setValue("alternative_email", res?.data?.business?.alternative_email);
        if (res?.data?.business?.alternative_phone) {
          setValue("alternative_phone", res?.data?.business?.alternative_phone);
        }
        if (res?.data?.business?.alternative_country_code) {
          setValue(
            "alternative_country_code",
            res?.data?.business?.alternative_country_code
          );
        }
        setValue("gstin", res?.data?.business?.gst_number);
        setValue("address", res?.data?.address?.street_1);
        setValue("city", res?.data?.address?.city);
        setValue("state", res?.data?.address?.state);
        setValue("zip", res?.data?.address?.zip);
        setValue("country", res?.data?.address?.country);
        setValue("pan_card", res?.data?.business?.pan_card);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="container px-4 pt-5">
        <div className="row">
          <div className="col-12">
            <button className="back-btn" onClick={() => navigate("/profile")}>
              <ChevronLeft></ChevronLeft>
              Business Profile
            </button>
            <p className="font-14 mb-0">
              Please fill your shop details and get the<br></br>
              <b>Best Prices</b>
            </p>
          </div>
          <div className="col-12 ">
            <Input
              type="text"
              name="business_name"
              label="Business Name"
              control={control}
              inputMode="text"
              error={errors.business_name?.message}
            />
          </div>
          <div className="col-12">
            <Input
              type="text"
              name="business_email"
              label="Business Email"
              control={control}
              inputMode="email"
              error={errors.business_email?.message}
            />
          </div>
          <div className="col-3">
            <Input
              type="text"
              name="business_country_code"
              label="Code"
              placeholder="+91"
              control={control}
              inputMode="tel"
              error={errors.business_country_code?.message}
            />
          </div>
          <div className="col-9">
            <Input
              type="text"
              name="business_phone"
              label="Business Phone"
              control={control}
              inputMode="numeric"
              error={errors.business_phone?.message}
            />
          </div>
          <div className="col-12">
            <Input
              type="text"
              name="alternative_email"
              label="Alternative Email (Optional)"
              control={control}
              inputMode="email"
              error={errors.alternative_email?.message}
            />
          </div>
          <div className="col-3">
            <Input
              type="text"
              name="alternative_country_code"
              label="Code"
              placeholder="+91"
              control={control}
              inputMode="tel"
              error={errors.alternative_country_code?.message}
            />
          </div>
          <div className="col-9">
            <Input
              type="text"
              name="alternative_phone"
              label="Alternative Phone (Opional)"
              control={control}
              inputMode="numeric"
              error={errors.alternative_phone?.message}
            />
          </div>
          <div className="col-12">
            <Input
              type="text"
              name="gstin"
              label="GSTIN"
              control={control}
              inputMode="text"
              error={errors.gstin?.message}
            />
          </div>
          <div className="col-12">
            <Input
              type="text"
              name="address"
              label="Address"
              control={control}
              inputMode="text"
              error={errors.address?.message}
            />
          </div>
          <div className="col-6">
            <Input
              type="text"
              name="city"
              label="City"
              control={control}
              inputMode="text"
              error={errors.city?.message}
            />
          </div>
          <div className="col-6">
            <Input
              type="text"
              name="state"
              label="State"
              control={control}
              inputMode="text"
              error={errors.state?.message}
            />
          </div>
          <div className="col-6">
            <Input
              type="text"
              name="zip"
              label="Zip"
              control={control}
              inputMode="numeric"
              error={errors.zip?.message}
            />
          </div>
          <div className="col-6">
            <Input
              type="text"
              name="country"
              label="Country"
              control={control}
              inputMode="text"
              error={errors.country?.message}
            />
          </div>

          <div className="col-12">
            <FileInput
              name="pan_card"
              label="Upload PAN Card"
              control={control}
              error={errors.pan_card?.message}
            />
          </div>
          <div className="col-12 pt-4 pb-4">
            <button
              className="fill"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthBusinessdetails;
