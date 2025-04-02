/**
 * Komponen untuk menampilkan status stok produk.
 * - Tampilkan "Sold Out" jika quantity 0
 * - Tampilkan "Only X Left in Stock!" jika quantity < 5
 * - Tampilkan "In Stock: X items" jika showAlways true
 *
 * @param {number} quantity - Jumlah stok tersisa.
 * @param {boolean} showAlways - Jika true, tetap tampilkan info stok meski jumlah besar.
 * @param {string} className - Class tambahan yang bisa override default.
 */
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
        In Stock: {quantity} items
      </p>
    );
  }

  return null;
};

export default ProductStockStatus;
