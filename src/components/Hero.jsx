import Button from "./Button";
const Hero = () => {
  return (
    <section className="mx-auto bg-[#F2F0F1]">
      <div className="flex flex-col  md:flex-row items-center justify-center">
        <div className="flex items-start justify-start flex-col md:w-1/2  mt-8 md:ml-20 pl-8">
          <h1 className="font-bold md:text-[64px] text-[40px] leading-none my-2 font-[Poppins]">
            FIND CLOTHES <br />
            THAT MATCHES <br />
            YOUR STYLE
          </h1>
          <p className="text-base my-2 md:max-w-[30rem] max-w-[22rem] font-semibold">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <div className="my-4">
            <Button label="Shop now" />
          </div>
          <div className="flex justify-between md:flex-row flex-col space-x-6 ">
            <div className="flex md:my-4 my-2">
              <div className="flex flex-col md:pr-10">
                <h4 className="text-4xl font-bold">200+</h4>
                <p className="text-sm text-gray-900 ">International Brands</p>
              </div>
              <div className="flex flex-col pr-10">
                <h4 className="text-4xl font-bold">2,000+</h4>
                <p className="text-sm text-gray-900">High-Quality Products</p>
              </div>
            </div>
            <div className="flex flex-col pr-10 text-center md:my-4 my-2 md:text-start">
              <h4 className="text-4xl font-bold">30,000+</h4>
              <p className="text-sm text-gray-900">Happy Customers</p>
            </div>
          </div>
        </div>
        <div className="md:mt-10 md:pt-10 relative">
          <img
            src="https://res.cloudinary.com/djp6mwlpk/image/upload/v1712298091/Rectangle_2_1_q03w1k.png"
            alt="Hero image"
            className="max-h-[37rem]"
          />
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-[11rem] left-16 md:max-w-10 max-w-9"
          >
            <path
              d="M28 0C28.9506 15.0527 40.9472 27.0495 56 28C40.9472 28.9506 28.9506 40.9472 28 56C27.0495 40.9472 15.0527 28.9506 0 28C15.0527 27.0495 27.0495 15.0527 28 0Z"
              fill="black"
            />
          </svg>

          <svg
            width="104"
            height="104"
            viewBox="0 0 104 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute md:top-[4rem] top-8 md:right-[5rem] right-[3rem] md:max-w-20 max-w-16"
          >
            <path
              d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
