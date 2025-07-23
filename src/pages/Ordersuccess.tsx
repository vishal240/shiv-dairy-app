import notification from '../assets/phone.png'


const Ordersuccess = () => {
  return (
    <>
          <div className="">
            <div className='cont'>
                <div></div>
                <div className='logo_con px-3'>
                    <div className="">
                        <div className="">
                            <img src={notification}></img>
                        </div>
                    </div>
                    <h5 className='text-center pt-4'>Order Success!</h5>
                    <p className='text-center pt-2 color-grey'>
                        Your order is on the way. We'll keep you posted every step of the journey, so you'll know exactly when to get excited for your needs.
                    </p>
                </div>
                <div className='padding_15'>
                    <button className='fill'>Track Order</button>
                    <button className='outline'>Go to Shopping</button>
                 
                </div>
            </div>
       </div>
    </>
  )
}

export default Ordersuccess