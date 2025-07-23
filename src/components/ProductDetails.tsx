import milk from "../assets/milk.jpg";
import { Minus, Plus } from "react-feather";
import ApiService from "../services/api";
import { useEffect, useState } from "react";
interface Props {
  data: any;
}
const ProductDetails = ({ data }: Props) => {
  const [productList, setProductList] = useState<any>([]);
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});

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

  const getQuantity = (productId: string) => {
    return cartItems[productId] || 0;
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      const updatedItems = { ...cartItems };
      delete updatedItems[productId];
      setCartItems(updatedItems);
    } else {
      setCartItems(prev => ({
        ...prev,
        [productId]: newQuantity
      }));
    }
  };

  const addToCart = (item: any) => {
    console.log(item);
    const currentQuantity = getQuantity(item._id);
    updateQuantity(item._id, currentQuantity + 1);
    
    // ApiService.post("/user/addToCart", {
    //   store_id: item?.store_id?._id,
    //   product_id: item?._id,
    //   quantity: currentQuantity + 1,
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

  const increaseQuantity = (item: any) => {
    const currentQuantity = getQuantity(item._id);
    updateQuantity(item._id, currentQuantity + 1);
  };

  const decreaseQuantity = (item: any) => {
    const currentQuantity = getQuantity(item._id);
    updateQuantity(item._id, currentQuantity - 1);
  };

  useEffect(() => {
    getProductList();
  }, [data]);

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
            {getQuantity(item._id) === 0 ? (
              <label className="qty_m">
                <button className="addtocart" onClick={() => addToCart(item)}>
                  Add to cart
                </button>
              </label>
            ) : (
              <label className="qty_m">
                <button
                  className="minus"
                  onClick={() => decreaseQuantity(item)}
                >
                  <Minus size={16}></Minus>
                </button>
                <input type="text" disabled value={getQuantity(item._id)}></input>
                <button
                  className="plus"
                  onClick={() => increaseQuantity(item)}
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
