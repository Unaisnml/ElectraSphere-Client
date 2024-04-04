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
    <main className="relative">
      <hr />
    
      {/* <section className="padding bg-black text-white">
        <Carousel slides={slides} />
      </section> */}
      <section className="max-xl:mx-8 max-lg:mx-2">
      <ProductCard products={products} />
      </section>
    </main>
  );
};

export default HomePage;
