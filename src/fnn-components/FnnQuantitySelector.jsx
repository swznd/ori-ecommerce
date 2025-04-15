const FnnQuantitySelector = ({
  value,
  onIncrease,
  onDecrease,
  max = 10,
  min = 1,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center rounded border-1 border-neutral-400 bg-white select-none ${className}`}
    >
      {/* Tombol (-) */}
      <button
        aria-label="Decrease quantity"
        disabled={value <= min}
        className="text-md h-7 w-7 cursor-pointer font-medium disabled:opacity-20"
        onClick={onDecrease}
      >
        -
      </button>

      {/* Value */}
      <input
        type="text"
        readOnly
        value={value}
        className="input input-md h-7 w-8 border-0 bg-transparent p-0 text-center focus:ring-0 focus:outline-none disabled:opacity-50"
      />

      {/* Tombol (+) */}
      <button
        aria-label="Increase quantity"
        disabled={value >= max}
        className="text-md h-7 w-7 cursor-pointer font-medium disabled:opacity-20"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
};

export default FnnQuantitySelector;
