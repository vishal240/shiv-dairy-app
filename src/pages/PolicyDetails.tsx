import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiService from "../services/api";
import { ChevronLeft } from "react-feather";
import { useNavigate } from "react-router-dom";
const PolicyDetails = () => {
  const location = useLocation();
  const type = location.state?.type;
  const [policyDetails, setPolicyDetails] = useState<any>({});
  const navigate = useNavigate();
  useEffect(() => {
    ApiService.post("/user/getPageDetails", { page_type: type })
      .then((res: any) => {
        console.log(res);
        setPolicyDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container px-4 pt-5">
      <div className="row">
        <div className="col-12">
          <button className="back-btn" onClick={() => navigate("/profile")}>
            <ChevronLeft></ChevronLeft>
            {type}
          </button>
        </div>
        <div className="col-6 pt-3">
          <div
            dangerouslySetInnerHTML={{ __html: policyDetails?.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
