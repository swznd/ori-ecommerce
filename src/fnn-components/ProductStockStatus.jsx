const ProductStockStatus = ({
  quantity,
  showAlways = false,
  className = '',
}) => {
  if (quantity === 0) {
    return <p className={`text-error text-sm ${className}`}>Sold Out</p>;
  }

  if (quantity < 5) {
    return (
      <p className={`text-error text-sm ${className}`}>
        Only {quantity} Left in Stock!
      </p>
    );
  }

  if (showAlways) {
    return (
      <p className={`text-neutral text-sm ${className}`}>
        {quantity > 10 ? 'In Stock' : `In Stock: ${quantity} items`}
      </p>
    );
  }

  return null;
};

export default ProductStockStatus;
