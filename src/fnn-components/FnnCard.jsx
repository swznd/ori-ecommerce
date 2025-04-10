import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import slugify from '@/utils/slugify';
import { getSelectedVariant } from '@/utils/getSelectedVariant';

import ProductImage from '@/fnn-components/ProductImage';
import ProductTitle from '@/fnn-components/ProductTitle';
import ProductPrice from '@/fnn-components/ProductPrice';
import ProductStockStatus from '@/fnn-components/ProductStockStatus';
import FnnProductColorOptions from '@/fnn-components/FnnProductColorOptions';

const FnnCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.[0]?.color || 'Default Color',
  );

  const selectedVariant = useMemo(
    () => getSelectedVariant(product.variants, selectedColor),
    [selectedColor, product.variants],
  );

  return (
    <div className="flex w-full flex-col gap-3">
      <Link
        to={`/product/${slugify(product.name)}`}
        className="flex flex-col gap-2"
      >
        <ProductImage src={selectedVariant?.images?.[0]} alt={product.name} />
        <ProductTitle
          category={product.details?.category}
          name={product.name}
        />
      </Link>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-slate-500">
          {selectedVariant?.color || 'Unknown Color'}
        </p>

        <FnnProductColorOptions
          variants={product.variants}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />

        <ProductPrice price={product.price} salePrice={product.price_sale} />

        <ProductStockStatus quantity={selectedVariant?.quantity} />
      </div>
    </div>
  );
};

export default FnnCard;
