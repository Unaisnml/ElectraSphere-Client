const CountButton = ({ count, onIncrement, onDecrement, stockQuantity }) => {
  return (
    <div className=" text-md font-semibold flex items-center justify-center gap-3 rounded-xl border ">
      <button
        onClick={onDecrement}
        className={`md:px-3 px-2 rounded-full text-xl font-bold ${
          count <= 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={count <= 1}
      >
        -
      </button>
      <span className="px-1 ">{count}</span>
      <button
        onClick={onIncrement}
        // className="md:px-3 px-2 rounded-full text-xl font-bold"
        className={`md:px-3 px-2 rounded-full text-xl font-bold ${
          count >= stockQuantity ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={count >= stockQuantity}
      >
        +
      </button>
    </div>
  );
};

export default CountButton;
