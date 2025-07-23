import {
  Box,
  ChevronLeft,
  ChevronRight,
  Edit,
  File,
  Lock,
  MapPin,
  MessageCircle,
  ShoppingBag,
} from "react-feather";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import ApiService from "../services/api";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState<any>({});
  const getProfileDetails = () => {
    ApiService.post("/user/getCustomerDetails")
      .then((res: any) => {
        console.log(res);
        setProfileDetails(res.data);
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
      <div className="container px-4 pt-4">
        <div className="row">
          <div className="col-12">
            <h2 className="head-2">
              <ChevronLeft onClick={() => navigate("/home")}></ChevronLeft>
              Profile Settings
            </h2>
            <p className="font-14 mb-0">You can edit your profile here</p>
          </div>
          <div className="col-12 pt-4">
            <div className="crd2 d-flex align-items-center justify-content-between">
              <div className="d-flex gap-10 align-items-center">
                <img
                  src={profileDetails?.customer?.profile_image}
                  className="primg"
                ></img>
                <div>
                  {profileDetails?.customer?.fname ? (
                    <h2 className="font-16 mb-1">
                      {profileDetails?.customer?.fname}{" "}
                      {profileDetails?.customer?.lname}
                    </h2>
                  ) : (
                    <h2 className="font-16 mb-1">N/A</h2>
                  )}
                  <p className="font-14 mb-0">
                    {profileDetails?.customer?.email
                      ? profileDetails?.customer?.email
                      : "N/A"}
                  </p>
                </div>
              </div>
              <Edit onClick={() => navigate("/myprofile")} size={20}></Edit>
            </div>
          </div>

          <div className="col-12 pt-4">
            <h6 className="font-14 pb-2">General Information</h6>
          </div>
          <div className="col-12">
            <div className="crd2">
              <div
                onClick={() => navigate("/addressdetails")}
                className="d-flex  font-14 align-items-center justify-content-between border-bottom pb-3 pt-2"
              >
                <div className="d-flex gap-10 align-items-center">
                  <MapPin size={16}></MapPin> Address
                </div>
                <ChevronRight size={16}></ChevronRight>
              </div>
              {profileDetails?.customer?.user_type === "b2b" && (
                <div
                  onClick={() => navigate("/authbusinessdetails")}
                  className="d-flex gap-10 font-14 align-items-center justify-content-between border-bottom pb-3 pt-3"
                >
                  <div className="d-flex gap-10 align-items-center">
                    <Box size={16}></Box> Business Details
                  </div>
                  <ChevronRight size={16}></ChevronRight>
                </div>
              )}
              <div className="d-flex gap-10 font-14 align-items-center justify-content-between pb-3 pt-3">
                <div className="d-flex gap-10 align-items-center">
                  <ShoppingBag size={16}></ShoppingBag> My Orders
                </div>
                <ChevronRight size={16}></ChevronRight>
              </div>
            </div>
          </div>
          <div className="col-12 pt-4">
            <h6 className="font-14 pb-2">Supports</h6>
          </div>
          <div className="col-12">
            <div className="crd2">
              <div className="d-flex gap-10 font-14 align-items-center justify-content-between border-bottom pb-3 pt-2">
                <div className="d-flex gap-10 align-items-center">
                  <MessageCircle size={16}></MessageCircle>
                  Need Help? Message Now
                </div>
                <ChevronRight size={16}></ChevronRight>
              </div>
              <div
                onClick={() =>
                  navigate("/policydetails", {
                    state: { type: "Privacy Policy" },
                  })
                }
                className="d-flex gap-10 font-14 align-items-center justify-content-between border-bottom pb-3 pt-3"
              >
                <div className="d-flex gap-10 align-items-center">
                  <Lock size={16}></Lock> Privacy Policy
                </div>
                <ChevronRight size={16}></ChevronRight>
              </div>
              <div
                onClick={() =>
                  navigate("/policydetails", {
                    state: { type: "Terms & Conditions" },
                  })
                }
                className="d-flex gap-10 font-14 align-items-center justify-content-between  pb-3 pt-3"
              >
                <div className="d-flex gap-10 align-items-center">
                  <File size={16}></File> Term & Conditions
                </div>
                <ChevronRight size={16}></ChevronRight>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
