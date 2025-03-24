import { useState, useMemo } from 'react';
import { getSelectedVariant } from '@/utils/getSelectedVariant';
import ProductImage from '@/fnn-components/ProductImage';

const FnnCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.[0]?.color || 'Default Color',
  ); // Warna default

  const selectedVariant = useMemo(() => {
    return getSelectedVariant(product.variants, selectedColor);
  }, [selectedColor, product.variants]);

  return (
    <div className="flex w-full cursor-pointer flex-col gap-3">
      <div className="flex flex-col gap-2">
        <ProductImage src={selectedVariant?.images?.[0]} alt={product.name} />
        <div className="flex flex-col">
          {/* Menampilkan kategori */}
          <p className="text-sm tracking-wide text-gray-500">
            {product.details?.category || 'Uncategorized'}
          </p>
          <h3 className="font-medium">{product.name || 'Unknown Product'}</h3>{' '}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-slate-500">
          {selectedVariant?.color || 'Unknown Color'}
        </p>

        {/* Warna yang tersedia */}
        <h4 className="sr-only">Available colors</h4>
        <ul role="list" className="flex flex-wrap space-x-2">
          {product.variants?.map((variant) => (
            <li
              key={variant.color}
              className={`size-5 cursor-pointer rounded-full border border-black/10 transition ${
                selectedColor === variant.color ? 'ring-1 ring-slate-500' : ''
              }`}
              style={{ backgroundColor: variant.colorBg }}
              onClick={() => setSelectedColor(variant.color)}
            >
              <span className="sr-only">{variant.color}</span>
            </li>
          )) || <p className="text-red-500">No variants available</p>}
        </ul>

        {/* Menampilkan Harga atau Harga Diskon */}
        <div className="flex flex-wrap items-start gap-2">
          {product.price_sale ? (
            <>
              <p className="text-xl text-gray-700">
                ¥{product.price_sale.toLocaleString('en-US')}
              </p>
              <p className="text-sm text-red-500 line-through">
                ¥{product.price.toLocaleString('en-US')}
              </p>
            </>
          ) : (
            <p className="text-xl text-gray-700">
              ¥{product.price ? product.price.toLocaleString('en-US') : 'N/A'}
            </p>
          )}
        </div>

        {/* Tampilkan status stok */}
        {selectedVariant?.quantity === 0 ? (
          <p className="text-sm text-red-600">Sold Out</p>
        ) : selectedVariant?.quantity < 5 ? (
          <p className="text-sm text-red-600">
            Only {selectedVariant.quantity} Left in Stock!
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default FnnCard;
