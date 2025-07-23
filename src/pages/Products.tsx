import { Bookmark, ChevronLeft, Minus, Plus, Search } from "react-feather";
import banner from "../assets/banner.jpg";
import milk from "../assets/milk.jpg";
const Products = () => {
  return (
    <>
      <div className="container pt-4 pb-4">
        <div className="row">
          <div className="col-12">
            <button className="back-btn">
              <ChevronLeft></ChevronLeft>
              Shop Details
            </button>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12 p-0">
            <img src={banner} className="w-100"></img>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <b className="font-16">Shiv Shakti Dairy</b>
            <Bookmark size={20}></Bookmark>
          </div>
          <div className="col-12">
            <p className="font-12 color-grey mb-1 mt-1">4 km • 15 mins</p>
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
            <h6>Categories</h6>
          </div>
          <div className="col-12 pt-1">
            <ul className="catlg">
              <li className="active">Organic Milk </li>
              <li>Milk</li>
              <li>Butter</li>
            </ul>
          </div>
        </div>
        <div className="row pt-0">
          <div className="col-12">
            <div className="cards mt-3 bg-white border">
              <div className="stimg">
                <img src={milk}></img>
              </div>
              <div className="flex-2 pt-0 px-3">
                <p className="font-16 mb-1">Organic Pure Milk</p>
                <p className="color-red font-12 mb-1">1 Ltr Pack</p>
                <p className="color-grey font-12 mb-1">Min Order: 100 Pck</p>
                <b className="font-16  mb-0">₹20.99</b>
              </div>
              <div className="rating2 pt-3 px-2">
                <label className="qty_m">
                  <button className="plus">
                    <Plus size={16}></Plus>
                  </button>
                  <input type="text" placeholder="2"></input>
                  <button className="minus">
                    <Minus size={16}></Minus>
                  </button>
                </label>
              </div>
            </div>
            <div className="cards mt-3 bg-white border">
              <div className="stimg">
                <img src={milk}></img>
              </div>
              <div className="flex-2 pt-0 px-3">
                <p className="font-16 mb-1">Organic Pure Milk</p>
                <p className="color-red font-12 mb-1">1 Ltr Pack</p>
                <p className="color-grey font-12 mb-1">Min Order: 100 Pck</p>
                <b className="font-16  mb-0">₹20.99</b>
              </div>
              <div className="rating2 pt-3 px-2">
                <label className="qty_m">
                  <button className="addtocart">Add to cart</button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
