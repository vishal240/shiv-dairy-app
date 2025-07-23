import { ChevronLeft, Search } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../services/api";
import { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails";
const ProductList = () => {
  const navigate = useNavigate();
  const { category } = useLocation().state;
  const [currentCat, setCurrentCat] = useState(category._id);
  const [categories, setCategories] = useState<any>([]);
  const getAllCategories = () => {
    ApiService.get("/user/getAllCategoryList")
      .then((res: any) => {
        setCategories(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      <div className="container pt-4 pb-4">
        <div className="row">
          <div className="col-12">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <ChevronLeft></ChevronLeft>
              Products List
            </button>
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
              {categories?.map((item: any) => (
                <li
                  className={currentCat === item._id ? "active" : ""}
                  key={item?._id}
                  onClick={() => setCurrentCat(item._id)}
                >
                  {item?.product_category_name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row pt-0">
          <div className="col-12">
            <ProductDetails data={{ category_id: currentCat }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
