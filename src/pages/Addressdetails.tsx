import { ChevronLeft, Edit, PlusCircle } from "react-feather";
import ApiService from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Addressdetails = () => {
  const navigate = useNavigate();
  const [addressDetails, setAddressDetails] = useState<any>([]);
  const getProfileDetails = () => {
    ApiService.get("/user/getCustomerAddress")
      .then((res: any) => {
        console.log(res.data.customer_address);
        setAddressDetails(res.data.customer_address);
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
      <div className="wrrap">
        <div className="container pt-4">
          <div className="row">
            <div className="col-12">
              <button className="back-btn">
                <ChevronLeft onClick={() => navigate("/profile")}></ChevronLeft>
                Address Details
              </button>
            </div>
          </div>
          <div className="row pt-4">
            {addressDetails?.map((item: any) => (
              <div
                className="col-12 mb-2"
                key={item?._id}
                onClick={() =>
                  navigate("/authaddress", {
                    state: {
                      address: item,
                    },
                  })
                }
              >
                <div className="cards2 d-block p-3">
                  <div className="d-flex align-items-center w-100 justify-content-between">
                    <b className="font-14">
                      {item?.is_primary ? "Primary" : "Secondary"}
                    </b>
                    <Edit size={16}></Edit>
                  </div>
                  <div className="pt-2">
                    <p className="font-14 mb-1">
                      {item?.fname} {item?.lname}
                    </p>
                    <p className="font-14 color-grey mb-1">
                      {item?.country_code}
                      {item?.phone_number}
                    </p>
                    <p className="font-14 color-grey mb-1">
                      {item?.street_1}, {item?.city}, {item?.state},
                      {item?.country}, {item?.zip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12 pt-4">
              <button
                className="add_new"
                onClick={() =>
                  navigate("/authaddress", {
                    state: {
                      address: null,
                    },
                  })
                }
              >
                <PlusCircle></PlusCircle>
                Add New Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addressdetails;
