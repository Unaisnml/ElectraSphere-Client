import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({value, text}) => {
    console.log("text",text);
    console.log("value:",value);
  return (
    <div className="cursor-pointer flex items-center space-x-2">
        <div className="cursor-pointer flex items-center space-x-1 text-yellow-400">
        <span>
            {
                (value >=1) ? <FaStar/> : (value >= 0.5) ? <FaStarHalfAlt/> :<FaRegStar/>
            }
        </span>
        <span>
            {
                (value >=2) ? <FaStar/> : (value >= 1.5) ? <FaStarHalfAlt/> :<FaRegStar/>
            }
        </span>
        <span>
            {
                (value >=3) ? <FaStar/> : (value >= 2.5) ? <FaStarHalfAlt/> :<FaRegStar/>
            }
        </span>
        <span>
            {
                (value >=4) ? <FaStar/> : (value >= 3.5) ? <FaStarHalfAlt/> :<FaRegStar/>
            }
        </span>
        <span>
            {
                (value >=5) ? <FaStar/> : (value >= 4.5) ? <FaStarHalfAlt/> :<FaRegStar/>
            }
        </span>
        </div>
        <span className='text-blue-700 underline'>{text && text}</span>

    </div>
  )
}

export default Rating