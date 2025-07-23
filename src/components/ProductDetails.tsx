import milk from "../assets/milk.jpg";
import { Minus, Plus } from "react-feather";
import ApiService from "../services/api";
import { useEffect, useState } from "react";
interface Props {
  data: any;
}
const ProductDetails = ({ data }: Props) => {
  const [productList, setProductList] = useState<any>([]);
  const [quantity, setQuantity] = useState(0);
  const getProductList = () => {
    ApiService.post("/user/getProductList", {
      filters: {
        store_id: "",
        brand_id: "",
        category_id: data.category_id,
        search: "",
      },
      sorters: {
        // created_on: "",
      },
      pagination: {
        page: 1,
        pageSize: 50,
      },
    })
      .then((res: any) => {
        console.log(res.data);
        setProductList(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addToCart = (item: any) => {
    console.log(item);
    setQuantity((prev: number) => prev + 1);
    // ApiService.post("/user/addToCart", {
    //   store_id: item?.store_id?._id,
    //   product_id: item?._id,
    //   quantity: quantity,
    //   discount_type: item?.price?.discount_type,
    //   discount_value: item?.price?.discount_percentage,
    // })
    //   .then((res: any) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  useEffect(() => {
    getProductList();
  }, [data]);
  useEffect(() => {
    console.log(quantity);
  }, [quantity]);
  return (
    <>
      {productList?.map((item: any) => (
        <div className="cards mt-3 bg-white border" key={item?._id}>
          <div className="stimg">
            <img
              src={
                item?.product_images &&
                item?.product_images.length > 0 &&
                item?.product_images[0].generatedFilename
              }
            ></img>
          </div>
          <div className="flex-2 pt-0 px-3">
            <p className="font-16 mb-1">{item?.product_name}</p>
            {/* <p className="color-red font-12 mb-1">1 Ltr Pack</p> */}
            {item?.price?.batch && (
              <p className="color-grey font-12 mb-1">
                Batch: {item?.price?.batch}{" "}
              </p>
            )}
            {item?.price?.batch_quantity && (
              <p className="color-grey font-12 mb-1">
                Min Order: {item?.price?.batch_quantity}{" "}
              </p>
            )}
            {item?.price?.quantity && (
              <p className="color-grey font-12 mb-1">
                Quantity: {item?.price?.quantity}{" "}
              </p>
            )}
            <b className="font-16  mb-0">₹{item?.price?.final_price}</b>
          </div>
          <div className="rating2 pt-3 px-2">
            {quantity == 0 ? (
              <label className="qty_m">
                <button className="addtocart" onClick={() => addToCart(item)}>
                  Add to cart
                </button>
              </label>
            ) : (
              <label className="qty_m">
                <button
                  className="minus"
                  onClick={() => setQuantity((prev: number) => prev - 1)}
                >
                  <Minus size={16}></Minus>
                </button>
                <input type="text" disabled value={quantity}></input>
                <button
                  className="plus"
                  onClick={() => setQuantity((prev: number) => prev + 1)}
                >
                  <Plus size={16}></Plus>
                </button>
              </label>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
