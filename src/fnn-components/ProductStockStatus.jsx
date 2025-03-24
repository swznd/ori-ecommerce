/**
 * Komponen untuk menampilkan status stok produk berdasarkan jumlah.
 * @param {number} quantity - Jumlah stok tersisa.
 */
const ProductStockStatus = ({ quantity }) => {
  if (quantity === 0) {
    return <p className="text-sm text-red-600">Sold Out</p>;
  }

  if (quantity < 5) {
    return (
      <p className="text-sm text-red-600">Only {quantity} Left in Stock!</p>
    );
  }

  return null;
};

export default ProductStockStatus;
