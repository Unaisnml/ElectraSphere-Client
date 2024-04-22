const Button = ({ label, onClick, stockQuantity }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-center bg-black md:py-2 py-2 md:px-5 px-4 text-white font-[Poppins] md:font-normal md:text-lg text-sm rounded-full md:min-w-[120px] ${
        stockQuantity === 0 ? "cursor-not-allowed opacity-50" : ""
      }`}
      disabled={stockQuantity === 0}
    >
      {label}
    </button>
  );
};

export default Button;
