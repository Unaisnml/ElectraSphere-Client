import React ,{useEffect, useState} from "react";
import slides from "../../Slides";
import Carousel from "../components/Carousel";
// import products from "../../Products";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([])
  // const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    try {
    const fetchProducts = async() => {
      // setIsLoading(true)
      const {data} = await axios.get('http://localhost:5000/api/products')
      setProducts(data)
      // setIsLoading(false)
    }
    console.log("products",products);
    fetchProducts()
  } catch (error) {
    console.error("Error")
  }
   
  },[])

  return (
    <div className="container mt-32 mx-auto md:mt-28 mb-24 z-50">
      {/* Carousel container */}
      <div className="w-[95%] mx-auto">
        <Carousel slides={slides} />
      </div>
      <ProductCard products={products} />
    </div>
  );
};

export default HomePage;
