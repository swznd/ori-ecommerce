/**
 * Ambil varian produk yang cocok berdasarkan warna yang dipilih.
 * @param {Array} variants - Daftar varian produk.
 * @param {string} selectedColor - Warna yang dipilih oleh user.
 * @returns {Object} Varian yang cocok atau varian pertama sebagai fallback.
 */
export function getSelectedVariant(variants = [], selectedColor) {
  return (
    variants.find((variant) => variant.color === selectedColor) ||
    variants[0] ||
    {}
  );
}
