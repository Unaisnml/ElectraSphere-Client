
import { Link } from 'react-router-dom'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <div className="flex justify-center items-center gap-12  mt-6 mb-8 ">
      {/* Step 1 */}
      <div className="flex items-center">
        <div className="flex justify-center items-center  h-8  ">
          {
            step1 ? (<Link to ='/login'>Sign In</Link>) : (<span className="text-gray-400 disabled">Sign In</span>)
          }
        </div>
      
      </div>

      {/* Step 2 */}
      <div className="flex items-center">
        <div className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-full">
          2
        </div>
        <div className="ml-2">Step 2</div>
      </div>

      {/* Step 3 */}
      <div className="flex items-center">
        <div className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-full">
          3
        </div>
        <div className="ml-2">Step 3</div>
      </div>
    </div>
  )
}

export default CheckoutSteps