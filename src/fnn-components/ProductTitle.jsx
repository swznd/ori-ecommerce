/**
 * Komponen untuk menampilkan kategori dan nama produk.
 *
 * @param {string} category - Nama kategori produk.
 * @param {string} name - Nama produk.
 * @param {string} wrapperClassName - Class Tailwind untuk wrapper div.
 * @param {string} categoryClassName - Class Tailwind untuk elemen kategori (<p>).
 * @param {string} titleClassName - Class Tailwind untuk elemen judul produk (<h3>).
 */
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
