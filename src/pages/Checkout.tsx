
import { ChevronLeft, ChevronRight, CreditCard, MapPin, Minus, Plus } from "react-feather"
import milk from '../assets/milk.jpg'

const Checkout = () => {
  return (
    <>
     <div className="wrrap">
        <div className="container pt-4">
            <div className="row">
                <div className="col-12">
                    <button className="back-btn">
                        <ChevronLeft></ChevronLeft>
                        Checkout Summery
                    </button>
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-12 pt-1">
                    <h6 className="mb-0">Customer Details</h6>
                </div>
               <div className="col-6 pt-3">
                    <label className='lbl2'>Name</label>
                    <input type='text' className='npt2'></input>
                </div>
                <div className="col-6 pt-3">
                    <label className='lbl2'>Mobile Number</label>
                    <input type='text' className='npt2'></input>
                </div>
                <div className="col-12 pt-3">
                    <div className="cards2">
                        <MapPin></MapPin>
                        <div>
                            <b className="font-14">Shop</b>
                            <p className="font-12 mb-0">Kemayoran, Cendana Street 1, Adinata Housing Complex, 10610, Jakarta, Indonesia</p>
                        </div>
                        <ChevronRight></ChevronRight>
                    </div>
                </div>

                <div className="col-12">
                    <div className="cards mt-3">
                    <div className='stimg'>
                        <img src={milk}></img>
                    </div>
                    <div className='flex-2 pt-0 px-3'>
                        <p className='font-16 mb-1'>Organic Pure Milk</p>
                        <p className="color-red font-12 mb-1">1 Ltr Pack</p>
                        <p className="color-grey font-12 mb-1">Min Order: 100 Pck</p>
                        <b className='font-16  mb-0'>₹20.99</b>
                    </div>
                    <div className='rating2 pt-3 px-2'>
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
                    <div className='stimg'>
                        <img src={milk}></img>
                    </div>
                    <div className='flex-2 pt-0 px-3'>
                        <p className='font-16 mb-1'>Organic Pure Milk</p>
                        <p className="color-red font-12 mb-1">1 Ltr Pack</p>
                        <p className="color-grey font-12 mb-1">Min Order: 100 Pck</p>
                        <b className='font-16  mb-0'>₹20.99</b>
                    </div>
                    <div className='rating2 pt-3 px-2'>
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

                <div className="col-12 pt-3 pb-3">
                    <h6 className="mb-0">Bill Details</h6>
                </div>

                <div className="col-12">
                    <div className="cards3 p-3">
                        <div className="row">
                            <div className="col-6">
                                <p className="font-14 mb-1 color-grey">Subtotal</p>
                            </div>
                            <div className="col-6 text-right">
                                <b className="font-14 mb-1 text-black d-block color-grey">₹27.49</b>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <p className="font-14 mb-1 color-grey">Delivery Fee</p>
                            </div>
                            <div className="col-6 text-right">
                                <b className="font-14 mb-1 text-black d-block color-grey">₹7.50</b>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <p className="font-14 mb-1 color-grey">Tax & Other Fees</p>
                            </div>
                            <div className="col-6 text-right">
                                <b className="font-14 mb-1 text-black d-block color-grey">₹7.50</b>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 pt-3">
                    <div className="cards3 p-3">
                        <div className="row">
                            <div className="col-6">
                                <b className="font-14 d-block mb-1 text-black">Total</b>
                            </div>
                            <div className="col-6 text-right">
                                <b className="font-14 mb-1 text-black d-block color-grey">₹347.49</b>
                            </div>
                        </div>
                       
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <label className="d-block w-100 position-relative">
                        <button className="apply">Apply</button>
                        <input className="promocode" type="text" placeholder="Apply Promocode"></input>
                    </label>
                </div>

                 <div className="col-12 pt-3 ">
                    <h6 className="mb-0">Select Payment Option</h6>
                </div>
                <div className="col-12 pt-3">
                    <div className="cards4">
                        
                        <div className="d-flex align-items-center">
                            <CreditCard size={19}></CreditCard>&nbsp;&nbsp;
                            <b className="font-14">View Payment Options</b>
                        </div>
                        <ChevronRight></ChevronRight>
                    </div>
                </div>

                <div className="col-12 pt-3">
                    <button className="fill">Go to Payments</button>
                     <button className="outline">Cancel Order</button>
                </div>
                 
            </div>
        </div>
     </div>
    </>
  )
}

export default Checkout