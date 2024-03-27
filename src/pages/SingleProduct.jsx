import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);
  // const {id:productId} =useParams()
  // const product = products.find((p)=> p._id === productId)
  // console.log(product);
  return (
    <div className='container mx-auto flex items-center'>
     
      <h1 className='mt-24 font-bold '>{product.name}</h1>
     
    </div>
  )
}

export default SingleProduct