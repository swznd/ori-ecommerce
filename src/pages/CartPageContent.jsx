import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/useCart';

import ProductImage from '@/fnn-components/ProductImage';
import FnnCartItemDetails from '@/fnn-components/cart/FnnCartItemDetails';
import FnnCartEmptyState from '@/fnn-components/cart/FnnCartEmptyState';
import FnnCartSubtotal from '@/fnn-components/cart/FnnCartSubtotal';

import slugify from '@/utils/slugify';

const CartPageContent = () => {
  const { cartItems, updateQuantity, removeFromCart, note, setNote } =
    useCart();

  const [showNote, setShowNote] = useState(false);

  // Auto show textarea if note already exists or was saved before
  useEffect(() => {
    if (note || localStorage.getItem('cartNote')) {
      setShowNote(true);
    }
  }, [note]);

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
    <section className="container mx-auto px-0 py-10">
      <h1 className="mb-8 text-2xl font-medium">Shopping Cart</h1>

      <div className="mb-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {/* Product List + Note */}
        <div className="space-y-12 md:col-span-1 lg:col-span-2">
          <ul className="list space-y-10 [&_.list-row:after]:!border-b-0">
            {cartItems.map((item) => (
              <li
                key={item.productId + item.variant.color}
                className="list-row p-0"
              >
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  className="size-28"
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

          {/* Note Section */}
          {!showNote ? (
            <p
              className="text-primary cursor-pointer text-base hover:underline"
              onClick={() => setShowNote(true)}
            >
              Add a note to seller
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-neutral text-base font-medium">
                Leave a note about your order
              </p>

              <textarea
                className="textarea textarea-secondary w-full md:max-w-lg"
                placeholder="Write here"
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="rounded-box bg-accent/10 col-span-1 flex h-60 flex-col justify-between p-7 lg:p-10">
          <FnnCartSubtotal cartItems={cartItems} />

          <div>
            <p className="text-neutral mb-2 text-xs font-medium">
              Estimated Total Weight:{' '}
              <span className="font-semibold text-black">
                {totalWeight} grams
              </span>
            </p>

            <button className="btn btn-accent w-full text-lg">Checkout</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPageContent;
