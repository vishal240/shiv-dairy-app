import { Bell, MapPin, Search } from "react-feather";
import Banner from "../assets/banner.jpg";
import ApiService from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState<any>({});
  const [categories, setCategories] = useState<any>([]);
  const [todaysChoice, setTodaysChoice] = useState<any>([]);
  const [storeList, setStoreList] = useState<any>([]);
  const getProfileDetails = () => {
    ApiService.post("/user/getCustomerDetails")
      .then((res: any) => {
        setProfileDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllCategories = () => {
    ApiService.get("/user/getAllCategoryList")
      .then((res: any) => {
        // console.log(res);
        setCategories(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTodaysChoice = () => {
    ApiService.post("/user/listTodaysChoiceProducts", {})
      .then((res: any) => {
        // console.log(res);
        setTodaysChoice(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStoreList = () => {
    ApiService.post("/user/getAllStore", {})
      .then((res: any) => {
        console.log(res);
        setStoreList(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProfileDetails();
    getAllCategories();
    getTodaysChoice();
    getStoreList();
  }, []);
  return (
    <>
      <div className="wrrap">
        <div className="container pt-4">
          <div className="row">
            <div className="col-8">
              <p className="font-12 color-red d-block mb-1">Deliver to</p>
              <div className="dilver">
                <MapPin></MapPin>
                {profileDetails?.address?.street_1},{" "}
                {profileDetails?.address?.city},{" "}
                {profileDetails?.address?.state},{" "}
                {profileDetails?.address?.country}
              </div>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-end">
              <Bell size={20}></Bell>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-12">
              <label className="search_lbl">
                <Search></Search>
                <input
                  type="search"
                  className="search"
                  placeholder="Search anything"
                ></input>
              </label>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-12">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={Banner} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={Banner} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={Banner} className="d-block w-100" alt="..." />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-6">
              <p className="mb-0 font-16 mb-0">Categories</p>
            </div>
            <div className="col-6 text-right">
              <p className="font-12 color-red mb-0">View All</p>
            </div>
          </div>
          <div className="row pt-3">
            {categories?.map((item: any) => (
              <div
                className="col-4"
                key={item?._id}
                onClick={() =>
                  navigate("/productlist", { state: { category: item } })
                }
              >
                <div className="cat">
                  <div>{item?.product_category_name}</div>
                  <img src={item?.category_image}></img>
                </div>
              </div>
            ))}
          </div>
          <div className="row pt-3">
            <div className="col-6">
              <p className="mb-0 font-16 mb-0">Today's choice</p>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-6">
              <div className="cat">
                <div>
                  <section>
                    <p className="mb-0">Ghee</p>
                    <p className="mb-0">1 Ltr</p>
                    <p className="mb-0">₹150.00</p>
                  </section>
                </div>
                <img src={Banner}></img>
              </div>
            </div>
            <div className="col-6">
              <div className="cat">
                <div>
                  <section>
                    <p className="mb-0">Ghee</p>
                    <p className="mb-0">1 Ltr</p>
                    <p className="mb-0">₹150.00</p>
                  </section>
                </div>
                <img src={Banner}></img>
              </div>
            </div>
          </div>
          <div className="row pt-3 pb-4">
            <div className="col-12">
              <p className="mb-0 font-16 mb-0">Popular Store</p>
            </div>
            {storeList?.map((item: any) => (
              <div
                className="col-12 pt-3"
                key={item?._id}
                onClick={() => navigate("/shop", { state: { store: item } })}
              >
                <div className="cards">
                  <div className="stimg">
                    <img src={item?.store_image}></img>
                  </div>
                  <div className="flex-2 pt-2 px-3">
                    <p className="font-16 mb-1">{item?.store_name}</p>
                    <p className="font-12 color-grey mb-0">
                      {item?.distance} km • {item?.time} mins
                    </p>
                  </div>
                  <div className="rating pt-3 px-2">
                    <p className="font-16 mb-0 text-right">⭐ 4.3</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
