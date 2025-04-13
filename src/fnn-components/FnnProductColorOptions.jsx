const FnnProductColorOptions = ({
  variants = [],
  selectedColor,
  onSelectColor,
  className = '', // biar bisa override
}) => {
  if (!variants.length) {
    return <p className="text-error">No variants available</p>;
  }

  return (
    <>
      <h4 className="sr-only">Available colors</h4>

      <ul role="list" className="flex flex-wrap space-x-2">
        {variants.map((variant) => (
          <li
            key={variant.color}
            className={`rounded-selector size-5 cursor-pointer border border-black/10 transition ${
              selectedColor === variant.color ? 'ring-1 ring-slate-500' : ''
            } ${className}`}
            style={{ backgroundColor: variant.colorBg }}
            onClick={() => onSelectColor(variant.color)}
          >
            <span className="sr-only">{variant.color}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FnnProductColorOptions;
