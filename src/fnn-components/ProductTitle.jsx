/**
 * Komponen untuk menampilkan kategori dan nama produk.
 * @param {string} category - Nama kategori produk.
 * @param {string} name - Nama produk.
 */
const ProductTitle = ({ category, name }) => {
  return (
    <div className="flex flex-col">
      <p className="text-sm tracking-wide text-gray-500">
        {category || 'Uncategorized'}
      </p>
      <h3 className="font-medium">{name || 'Unknown Product'}</h3>
    </div>
  );
};

export default ProductTitle;
