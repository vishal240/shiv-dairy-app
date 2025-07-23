import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/inputs/input";
import { useState } from "react";
import FileInput from "../components/inputs/FileInput";
import ApiService from "../services/api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "react-feather";
const MyProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const storeSchema = yup.object({
    fname: yup.string().required("First Name is required"),
    lname: yup.string().required("Last Name is required"),
    email: yup.string().required("Email is required"),
    country_code: yup
      .string()
      .required("+91")
      .matches(/^\+\d{1,4}$/, "+91"),
    phone_number: yup
      .string()
      .required("Phone number is required")
      .matches(/^[+]?[\d\s\-()]{10,15}$/, "Please enter a valid phone number"),

    address_line1: yup.string().required("Street Address One is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postal_code: yup
      .string()
      .required("Zip is required")
      .min(6, "Zip must be at least 6 characters")
      .max(6, "Zip must not exceed 6 characters"),
    country: yup.string().required("Country is required"),

    file: yup.mixed().optional(),
    customer_document: yup.mixed().optional(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(storeSchema as any),
  });
  const onSubmit = (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append("fname", data.fname);
    formData.append("lname", data.lname);
    formData.append("email", data.email);
    formData.append("country_code", data.country_code);
    formData.append("phone_number", data.phone_number);
    formData.append("street_1", data.address_line1);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("postal_code", data.postal_code);
    formData.append("country", data.country);
    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }
    if (data.customer_document && data.customer_document.length > 0) {
      formData.append("customer_document", data.customer_document[0]);
    }
    setLoading(true);
    ApiService.post("/user/updateCustomerDetails", formData)
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
  const getProfileDetails = () => {
    ApiService.post("/user/getCustomerDetails")
      .then((res: any) => {
        console.log(res);
        setValue("fname", res?.data?.customer?.fname);
        setValue("lname", res?.data?.customer?.lname);
        setValue("email", res?.data?.customer?.email);
        setValue("country_code", res?.data?.customer?.country_code_primary);
        setValue("phone_number", res?.data?.customer?.phone_primary);
        setValue("address_line1", res?.data?.address?.street_1);
        setValue("city", res?.data?.address?.city);
        setValue("state", res?.data?.address?.state);
        setValue("postal_code", res?.data?.address?.zip);
        setValue("country", res?.data?.address?.country);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProfileDetails();
  }, []);
  return (
    <>
      <div className="container px-4 pt-5">
        <div className="row">
          <div className="col-12">
            <button className="back-btn" onClick={() => navigate("/profile")}>
              <ChevronLeft></ChevronLeft>
              My Profile
            </button>

            <p className="font-14 mb-0">You can edit your profile here</p>
          </div>
          <div className="col-6 pt-3">
            <label className="lbl2">First Name</label>
            <Input
              control={control}
              name="fname"
              label=""
              type="text"
              placeholder="Enter First Name"
              inputMode="text"
              error={errors.fname?.message as string}
              disabled={loading}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="lbl2">Last Name</label>
            <Input
              control={control}
              name="lname"
              label=""
              type="text"
              placeholder="Enter Last Name"
              inputMode="text"
              error={errors.lname?.message as string}
              disabled={loading}
            />
          </div>
          <div className="col-12 pt-3">
            <label className="lbl2">Email</label>
            <Input
              control={control}
              name="email"
              label=""
              type="text"
              placeholder="Enter Email"
              inputMode="text"
              error={errors.email?.message as string}
              disabled={loading}
            />
          </div>
          <div className="col-3 pt-3">
            <label className="lbl2">Code</label>
            <Input
              control={control}
              name="country_code"
              label=""
              type="text"
              placeholder="+91"
              inputMode="tel"
              error={errors.country_code?.message as string}
              disabled={loading}
            />
          </div>
          <div className="col-9 pt-3">
            <label className="lbl2">Phone Number</label>
            <Input
              control={control}
              name="phone_number"
              label=""
              type="text"
              placeholder="Enter Phone Number"
              inputMode="numeric"
              error={errors.phone_number?.message as string}
              disabled={loading}
            />
          </div>

          <div className="col-12 pt-3">
            <label className="lbl2">Address</label>
            <Input
              control={control}
              name="address_line1"
              label=""
              type="text"
              placeholder="Enter Address"
              inputMode="text"
              error={errors?.address_line1?.message as string}
              disabled={loading}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="lbl2">City</label>
            <Input
              control={control}
              name="city"
              label=""
              type="text"
              placeholder="Enter City"
              inputMode="text"
              error={errors?.city?.message as string}
              disabled={loading}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="lbl2">State</label>
            <Input
              control={control}
              name="state"
              label=""
              type="text"
              placeholder="Enter State"
              inputMode="text"
              error={errors?.state?.message as string}
              disabled={loading}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="lbl2">Postal Code</label>
            <Input
              control={control}
              name="postal_code"
              label=""
              type="text"
              placeholder="Enter Postal Code"
              inputMode="numeric"
              error={errors?.postal_code?.message as string}
              disabled={loading}
            />
          </div>
          <div className="col-6 pt-3">
            <label className="lbl2">Country</label>
            <Input
              control={control}
              name="country"
              label=""
              type="text"
              placeholder="Enter Country"
              inputMode="text"
              error={errors?.country?.message as string}
              disabled={loading}
            />
          </div>
          <div className="col-12 pt-3">
            <label className="lbl2">Upload Profile Image</label>
            <FileInput
              name="file"
              label=""
              control={control}
              error={errors.file?.message as string}
            />
          </div>
          <div className="col-12 pt-3">
            <label className="lbl2">Upload PAN Card</label>
            <FileInput
              name="customer_document"
              label=""
              control={control}
              error={errors.customer_document?.message as string}
            />
          </div>
          <div className="col-12 pt-4 pb-4">
            <button className="fill" onClick={handleSubmit(onSubmit)}>
              Save{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
