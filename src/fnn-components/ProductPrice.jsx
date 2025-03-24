/**
 * Komponen untuk menampilkan harga produk.
 * Jika ada harga diskon, tampilkan keduanya.
 *
 * @param {number} price - Harga asli.
 * @param {number|null} salePrice - Harga diskon (jika ada).
 */
const ProductPrice = ({ price, salePrice }) => {
  const formattedPrice = price?.toLocaleString('en-US') ?? 'N/A';
  const formattedSalePrice = salePrice?.toLocaleString('en-US');

  return (
    <div className="flex flex-wrap items-start gap-2">
      {salePrice ? (
        <>
          <p className="text-xl text-gray-700">¥{formattedSalePrice}</p>
          <p className="text-sm text-red-500 line-through">¥{formattedPrice}</p>
        </>
      ) : (
        <p className="text-xl text-gray-700">¥{formattedPrice}</p>
      )}
    </div>
  );
};

export default ProductPrice;
