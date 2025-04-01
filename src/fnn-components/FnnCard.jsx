import { Link } from 'react-router-dom';
import slugify from '@/utils/slugify';
import { useState, useMemo } from 'react';
import { getSelectedVariant } from '@/utils/getSelectedVariant';
import ProductImage from '@/fnn-components/ProductImage';
import ProductTitle from '@/fnn-components/ProductTitle';
import ProductPrice from '@/fnn-components/ProductPrice';
import ProductStockStatus from '@/fnn-components/ProductStockStatus';
import FnnProductColorOptions from '@/fnn-components/FnnProductColorOptions';

const FnnCard = ({ product }) => {
  // State: warna varian yang sedang dipilih user
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.[0]?.color || 'Default Color',
  );

  // Memo: dapatkan varian sesuai warna yang dipilih
  const selectedVariant = useMemo(() => {
    return getSelectedVariant(product.variants, selectedColor);
  }, [selectedColor, product.variants]);

  return (
    <Link
      to={`/product/${slugify(product.name)}`}
      className="flex w-full cursor-pointer flex-col gap-3"
    >
      {/* Gambar & Informasi Produk */}
      <div className="flex flex-col gap-2">
        <ProductImage src={selectedVariant?.images?.[0]} alt={product.name} />
        <ProductTitle
          category={product.details?.category}
          name={product.name}
        />
      </div>

      {/* Detail Varian: Warna, Harga, Stok */}
      <div className="flex flex-col gap-2">
        {/* Warna yang sedang dipilih */}
        <p className="text-sm text-slate-500">
          {selectedVariant?.color || 'Unknown Color'}
        </p>

        {/* Pilihan warna (interaktif) */}
        <FnnProductColorOptions
          variants={product.variants}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />

        {/* Harga produk (bisa diskon) */}
        <ProductPrice price={product.price} salePrice={product.price_sale} />

        {/* Status ketersediaan stok */}
        <ProductStockStatus quantity={selectedVariant?.quantity} />
      </div>
    </Link>
  );
};

export default FnnCard;
