import { useCart } from '@/contexts/useCart';

import ProductImage from '@/fnn-components/ProductImage';
import FnnCartItemDetails from '@/fnn-components/cart/FnnCartItemDetails';
import FnnCartEmptyState from '@/fnn-components/cart/FnnCartEmptyState';
import FnnCartSubtotal from '@/fnn-components/cart/FnnCartSubtotal';

import slugify from '@/utils/slugify';

const CartPageContent = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalWeight = cartItems.reduce((acc, item) => {
    const weight = item.details?.weight ?? 0;
    return acc + weight * item.quantity;
  }, 0);

  if (!cartItems.length) {
    return (
      <section className="container mx-auto px-4 py-10">
        <FnnCartEmptyState />
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold">Your Cart</h1>

      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3">
        <ul className="list space-y-6 md:col-span-2 [&_.list-row:after]:!border-b-0">
          {cartItems.map((item) => (
            <li
              key={item.productId + item.variant.color}
              className="list-row p-0"
            >
              <ProductImage
                src={item.image}
                alt={item.name}
                className="size-24"
              />

              <FnnCartItemDetails
                item={item}
                href={`/product/${slugify(item.name)}?color=${encodeURIComponent(item.variant.color)}`}
                onIncrease={() =>
                  updateQuantity(
                    item.productId,
                    item.variant,
                    item.quantity + 1,
                  )
                }
                onDecrease={() =>
                  updateQuantity(
                    item.productId,
                    item.variant,
                    item.quantity - 1,
                  )
                }
                onRemove={() => removeFromCart(item.productId, item.variant)}
                classNameTitle="text-lg font-medium"
                classNameColor="text-base"
                classNamePrice="text-lg font-medium"
              />
            </li>
          ))}
        </ul>

        <div>
          <FnnCartSubtotal cartItems={cartItems} />

          <p className="text-neutral mb-2 text-sm font-medium">
            Estimated Total Weight:{' '}
            <span className="font-semibold text-black">
              {totalWeight} grams
            </span>
          </p>

          <button className="btn btn-accent w-full text-lg">Checkout</button>
        </div>
      </div>
    </section>
  );
};

export default CartPageContent;
