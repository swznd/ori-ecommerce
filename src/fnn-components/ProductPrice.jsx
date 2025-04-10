const ProductPrice = ({
  price,
  salePrice,
  className = '',
  classNamePrice = 'text-xl text-gray-700',
  classNameOriginal = 'text-warning text-sm line-through',
}) => {
  const formattedPrice = price?.toLocaleString('en-US') ?? 'N/A';
  const formattedSalePrice = salePrice?.toLocaleString('en-US');

  return (
    <div className={`flex flex-wrap items-start gap-2 ${className}`}>
      {salePrice ? (
        <>
          <p className={classNamePrice}>¥{formattedSalePrice}</p>
          <p className={classNameOriginal}>¥{formattedPrice}</p>
        </>
      ) : (
        <p className={classNamePrice}>¥{formattedPrice}</p>
      )}
    </div>
  );
};

export default ProductPrice;
