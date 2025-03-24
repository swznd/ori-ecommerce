/**
 * Komponen untuk menampilkan harga produk.
 * Menampilkan harga diskon jika tersedia, beserta harga asli yang dicoret.
 *
 * @param {number} price - Harga asli produk.
 * @param {number|null} salePrice - Harga diskon produk (jika ada).
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
