/**
 * Komponen interaktif untuk memilih warna varian produk.
 * Menampilkan daftar bulatan warna, dan memberikan feedback visual saat dipilih.
 *
 * @param {Array} variants - Daftar varian produk (masing-masing memiliki color dan colorBg).
 * @param {string} selectedColor - Warna yang sedang dipilih user.
 * @param {Function} onSelectColor - Fungsi untuk mengubah warna yang dipilih.
 */
const FnnProductColorOptions = ({
  variants = [],
  selectedColor,
  onSelectColor,
}) => {
  if (!variants.length) {
    return <p className="text-red-500">No variants available</p>;
  }

  return (
    <>
      {/* Label aksesibilitas */}
      <h4 className="sr-only">Available colors</h4>

      <ul role="list" className="flex flex-wrap space-x-2">
        {variants.map((variant) => (
          <li
            key={variant.color}
            className={`size-5 cursor-pointer rounded-full border border-black/10 transition ${
              selectedColor === variant.color ? 'ring-1 ring-slate-500' : ''
            }`}
            style={{ backgroundColor: variant.colorBg }}
            onClick={() => onSelectColor(variant.color)}
          >
            <span className="sr-only">{variant.color}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FnnProductColorOptions;
