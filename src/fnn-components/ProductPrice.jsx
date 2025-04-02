/**
 * Komponen untuk menampilkan harga produk.
 * Menampilkan harga diskon jika tersedia, beserta harga asli yang dicoret.
 *
 * @param {number} price - Harga asli produk.
 * @param {number|null} salePrice - Harga diskon produk (jika ada).
 * @param {string} className - Class wrapper utama.
 * @param {string} classNamePrice - Class harga diskon atau harga asli.
 * @param {string} classNameOriginal - Class harga asli yang dicoret.
 */
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
