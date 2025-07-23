import { Bookmark, ChevronLeft, Search } from "react-feather";
import banner from "../assets/banner.jpg";
import milk from "../assets/milk.jpg";
import { useNavigate, useLocation } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();
  const { store } = useLocation().state;
  return (
    <>
      <div className="container pt-4 ">
        <div className="row">
          <div className="col-12">
            <button className="back-btn" onClick={() => navigate("/home")}>
              <ChevronLeft></ChevronLeft>
              Shop Details
            </button>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12 p-0">
            <img src={store?.store_image} className="w-100"></img>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <b className="font-16">{store?.store_name}</b>
            <Bookmark size={20}></Bookmark>
          </div>
          <div className="col-12">
            <p className="font-12 color-grey mb-1 mt-1">
              {store?.distance} km • {store?.time} mins
            </p>
            <p className="font-12 mb-0">⭐ &nbsp; 4.8 (435 Ratings)</p>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12">
            <label className="search_lbl border rounded">
              <Search></Search>
              <input
                type="search"
                className="search"
                placeholder="Search anything"
              ></input>
            </label>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12">
            <h6>Catalogue</h6>
          </div>
          <div className="col-12 pt-1">
            <ul className="catlg">
              <li className="active">All </li>
              <li>Milk</li>
              <li>Butter</li>
              <li>Ghee</li>
            </ul>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-4">
            <div className="cat">
              <div>Milk</div>
              <img src={milk}></img>
            </div>
          </div>
          <div className="col-4">
            <div className="cat">
              <div>Butter</div>
              <img src={milk}></img>
            </div>
          </div>
          <div className="col-4">
            <div className="cat">
              <div>Paneer</div>
              <img src={milk}></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
