/**
 * Mengambil varian produk berdasarkan warna yang dipilih.
 * Jika warna tidak ditemukan, fallback ke varian pertama.
 * Jika tidak ada varian sama sekali, kembalikan objek kosong.
 *
 * @param {Array} variants - Daftar varian produk.
 * @param {string} selectedColor - Warna yang dipilih oleh user.
 * @returns {Object} Varian yang cocok atau fallback varian pertama / objek kosong.
 */
export function getSelectedVariant(variants = [], selectedColor) {
  return (
    variants.find((variant) => variant.color === selectedColor) ||
    variants[0] ||
    {}
  );
}
