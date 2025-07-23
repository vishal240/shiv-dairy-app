import { ChevronLeft } from "react-feather"
import milk from '../assets/milk.jpg'

const Favourite = () => {
  return (
   <>
    <div className="wrrap">
        <div className="container pt-4">
            <div className="row">
                <div className="col-12">
                    <button className="back-btn">
                        <ChevronLeft></ChevronLeft>
                        Favorite Store
                    </button>
                </div>
            </div>
            <div className="row">
                 <div className="col-12 pt-3">
                <div className="cards">
                    <div className='stimg'>
                        <img src={milk}></img>
                    </div>
                    <div className='flex-2 pt-2 px-3'>
                        <p className='font-16 mb-1'>Shiv Shakti Dairy</p>
                        <p className='font-12 color-grey mb-0'>12 km  •  36 mins</p>
                    </div>
                    <div className='rating pt-3 px-2'>
                        <p className='font-16 mb-0 text-right'>⭐ 4.3</p>
                    </div>
                </div>
                 </div>
                  <div className="col-12 pt-3">
                <div className="cards">
                    <div className='stimg'>
                        <img src={milk}></img>
                    </div>
                    <div className='flex-2 pt-2 px-3'>
                        <p className='font-16 mb-1'>Shiv Shakti Dairy</p>
                        <p className='font-12 color-grey mb-0'>12 km  •  36 mins</p>
                    </div>
                    <div className='rating pt-3 px-2'>
                        <p className='font-16 mb-0 text-right'>⭐ 4.3</p>
                    </div>
                </div>
                 </div>
            </div>
        </div>
    </div>
   </>
  )
}

export default Favourite