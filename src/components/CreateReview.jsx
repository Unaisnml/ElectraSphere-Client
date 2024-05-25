// import React,{useState} from 'react'
// import { Link } from 'react-router-dom';
// import {Loader} from './Loader';
// import { useSelector } from 'react-redux';
// import Message from './Message';

// const WriteReview = ({submitHandler, loadingProductReview}) => {
//     const {userInfo} = useSelector(state=>state.auth)
//     const [rating, setRating] = useState('');
//   const [comment, setComment] = useState('');

//   const handleSubmit = (e) => {
//     console.log("handleSubmit called with", e);
//     if (e && typeof e.preventDefault === 'function') {
//         e.preventDefault(); // Prevent the default form submission
//         submitHandler({ rating, comment });
//     } else {
//         console.error("handleSubmit was called without an event object", e);
//     }
//     // Call the submitHandler with the rating and comment
//     console.log("Hello");
//     submitHandler({ rating, comment });
//   };
//   return (
    
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Write a Customer Review</h2>
//       {loadingProductReview && <Loader />}

//       {userInfo ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
//             Rating
//           </label>
//           <select
//             id="rating"
//             required
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             className="mt-1 block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//           >
//             <option value="">Select...</option>
//             <option value="1">1 - Poor</option>
//             <option value="2">2 - Fair</option>
//             <option value="3">3 - Good</option>
//             <option value="4">4 - Very Good</option>
//             <option value="5">5 - Excellent</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
//             Comment
//           </label>
//           <textarea
//             id="comment"
//             rows="3"
//             required
//             value={comment}
//             placeholder='Write comments here'
//             onChange={(e) => setComment(e.target.value)}
//             className="mt-1 block focus:outline-none w-1/2 shadow-sm sm:text-sm border border-gray-200 rounded-md focus:ring-gray-300 focus:border-gray-300 px-2 py-2"
//           ></textarea>
//         </div>

//         <button
//           disabled={loadingProductReview}
//           type="submit"
//           className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${loadingProductReview && 'opacity-50 cursor-not-allowed'}`}
//         >
//           Submit
//         </button>
//       </form>
//       ) : (
//         <Message>
//           Please <Link to="/login"> <span className='text-red-600'>Sign In</span> </Link> to write a review
//           </Message>
//       )}
//     </div>
//   )
// }

// export default WriteReview


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';
import { useSelector } from 'react-redux';
import Message from './Message';

const WriteReview = ({ submitHandler, loadingProductReview }) => {
  const { userInfo } = useSelector(state => state.auth);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    // if (e && typeof e.preventDefault === 'function') {
      e.preventDefault(); // Prevent the default form submission
      submitHandler({ rating, comment });
    // } else {
    //   console.error("handleSubmit was called without an event object", e);
    // }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Write a Customer Review</h2>
      {loadingProductReview && <Loader />}

      {userInfo ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <select
              id="rating"
              required
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select...</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <textarea
              id="comment"
              rows="3"
              required
              value={comment}
              placeholder='Write comments here'
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 block focus:outline-none w-1/2 shadow-sm sm:text-sm border border-gray-200 rounded-md focus:ring-gray-300 focus:border-gray-300 px-2 py-2"
            ></textarea>
          </div>

          <button
            disabled={loadingProductReview}
            type="submit"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${loadingProductReview && 'opacity-50 cursor-not-allowed'}`}
          >
            Submit
          </button>
        </form>
      ) : (
        <Message>
          Please <Link to="/login"> <span className='text-red-600'>Sign In</span> </Link> to write a review
        </Message>
      )}
    </div>
  );
};

export default WriteReview;
