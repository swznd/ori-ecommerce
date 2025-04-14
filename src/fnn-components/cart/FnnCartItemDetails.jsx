import ProductPrice from '@/fnn-components/ProductPrice';
import FnnQuantitySelector from '@/fnn-components/FnnQuantitySelector';

import { TrashIcon, HeartIcon } from '@heroicons/react/16/solid';

const FnnCartItemDetails = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  classNameTitle = 'text-sm', // untuk item.name (h3)
  classNameColor = 'text-sm', // untuk item.variant.color (p)
  classNamePrice = 'text-sm font-medium', // untuk itemPrice
}) => {
  const itemPrice = item.price_sale ?? item.price;

  return (
    <>
      <div className="flex flex-col justify-between overflow-hidden">
        {/* Product Name & Color */}
        <div>
          <h3 className={`mb-1 w-full truncate ${classNameTitle}`}>
            {item.name}
          </h3>{' '}
          <p className={`${classNameColor}`}>Color: {item.variant.color}</p>{' '}
        </div>
        <div className="flex flex-row gap-2">
          <HeartIcon className="h-5 w-5 cursor-pointer text-gray-500 hover:text-red-500" />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-gray-500 hover:text-neutral-700"
            onClick={onRemove}
          />
        </div>
      </div>

      {/* Price, Qty & Action */}
      <div className="flex h-full flex-col items-end justify-between">
        <ProductPrice classNamePrice={classNamePrice} price={itemPrice} />

        <FnnQuantitySelector
          value={item.quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          max={item.variant.quantity}
          min={1}
        />
      </div>
    </>
  );
};

export default FnnCartItemDetails;
