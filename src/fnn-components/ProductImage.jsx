const ProductImage = ({ src, alt, className = '' }) => {
  const imageSrc = src || '/images/products/help-placeholder.jpg';

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`rounded-field aspect-square object-cover transition-opacity duration-200 hover:opacity-80 ${className}`}
    />
  );
};

export default ProductImage;
