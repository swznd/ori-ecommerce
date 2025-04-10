const ProductTitle = ({
  category,
  name,
  className = '',
  categoryClassName = '',
  nameClassName = '',
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <p className={`tracking-wide text-neutral-500 ${categoryClassName}`}>
        {category || 'Uncategorized'}
      </p>
      <h3 className={`text-neutral font-medium ${nameClassName}`}>
        {name || 'Unknown Product'}
      </h3>
    </div>
  );
};

export default ProductTitle;
