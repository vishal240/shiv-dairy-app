import { ChevronLeft, Minus, Plus } from "react-feather";
import Footer from "../components/Footer";
import milk from "../assets/milk.jpg";

const Cart = () => {
  return (
    <>
      <div className="wrrap">
        <div className="container pt-4">
          <div className="row">
            <div className="col-12">
              <button className="back-btn">
                <ChevronLeft></ChevronLeft>
                My Cart
              </button>
            </div>
          </div>
          <div className="row px-2 pt-2">
            <div className="col-12 ">
              <ul className="cart_tabs mb-0">
                <li className="active">My Cart</li>
                <li>Current Order</li>
                <li>Previous Order</li>
              </ul>
            </div>
          </div>
          <div className="row px-2">
            <div className="col-12 pt-3">
              <p>Your cart has 3 Items</p>
              <h6>Store: Shiv Dairy</h6>
              <div className="cards mt-3">
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
              <div className="cards mt-3">
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
            </div>
            <div className="col-12 mt-4">
              <button className="fill">Go to Checkout</button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Cart;
