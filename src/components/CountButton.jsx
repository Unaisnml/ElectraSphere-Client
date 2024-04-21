const CountButton = ({ count, onIncrement, onDecrement, stockQuantity }) => {
  return (
    <div className=" text-md font-semibold flex items-center justify-center gap-3 rounded-xl border ">
      <button
        onClick={onDecrement}
        className={`px-3 rounded-full text-xl font-bold ${
          count <= 1 ? "cursor-not-allowed" : ""
        }`}
        disabled={count <= 1}
      >
        -
      </button>
      <span className="px-1 ">{count}</span>
      <button
        onClick={onIncrement}
        className="px-3 rounded-full text-xl font-bold"
        disabled={count >= stockQuantity}
      >
        +
      </button>
    </div>
  );
};

export default CountButton;
