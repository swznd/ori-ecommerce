import { Link } from 'react-router-dom';
import { TrashIcon, HeartIcon } from '@heroicons/react/16/solid';

import ProductPrice from '@/fnn-components/ProductPrice';
import FnnQuantitySelector from '@/fnn-components/FnnQuantitySelector';

const FnnCartItemDetails = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  classNameTitle = 'text-sm',
  classNameColor = 'text-sm',
  classNamePrice = 'text-sm font-medium',
  href,
}) => {
  const itemPrice = item.price_sale ?? item.price;

  return (
    <>
      <div className="flex flex-col justify-between overflow-hidden">
        <div>
          <h3 className={`mb-1 w-full truncate ${classNameTitle}`}>
            <Link
              to={href}
              className="hover:underline"
              onClick={() => {
                document.getElementById('mini_cart_modal')?.close();
              }}
            >
              {item.name}
            </Link>
          </h3>
          <p className={classNameColor}>Color: {item.variant.color}</p>
        </div>

        <div className="flex flex-row gap-2">
          <HeartIcon className="h-5 w-5 cursor-pointer text-gray-500 hover:text-red-500" />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-gray-500 hover:text-neutral-700"
            onClick={onRemove}
          />
        </div>
      </div>

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
