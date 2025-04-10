import { useMemo } from 'react';
import { HeartIcon, TrashIcon } from '@heroicons/react/16/solid';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

import { useCart } from '@/contexts/useCart';

function MiniCart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const itemPrice = item.price_sale ?? item.price;
        return total + itemPrice * item.quantity;
      }, 0),
    [cartItems],
  );

  return (
    <dialog id="mini_cart_modal" className="modal">
      <div className="modal-box flex max-h-[80vh] w-full flex-col bg-white p-0">
        <div className="p-6">
          <h3 className="text-xl font-bold">Your Cart</h3>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 pb-6">
          <ul className="list space-y-6 [&_.list-row:after]:!border-b-0">
            <AnimatePresence>
              {cartItems.map((item) => {
                const itemPrice = item.price_sale ?? item.price;

                return (
                  <motion.li
                    key={item.productId + item.variant.color}
                    className="list-row p-0"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-20 rounded"
                    />

                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-medium">{item.name}</h3>
                        <p className="text-sm">Color: {item.variant.color}</p>
                      </div>

                      <div className="flex flex-row gap-2">
                        <HeartIcon className="h-5 w-5 cursor-pointer text-gray-500 hover:text-red-500" />
                        <TrashIcon
                          className="h-5 w-5 cursor-pointer text-gray-500 hover:text-neutral-700"
                          onClick={() =>
                            removeFromCart(item.productId, item.variant)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex h-full flex-col items-end justify-between">
                      <span className="text-base font-medium">
                        ¥{itemPrice.toLocaleString()}
                      </span>

                      <div className="m-0 flex items-center rounded border-0 bg-neutral-100 select-none">
                        <button
                          disabled={item.quantity <= 1}
                          className="text-md h-7 w-7 cursor-pointer font-medium disabled:opacity-20"
                          onClick={() =>
                            item.quantity > 1 &&
                            updateQuantity(
                              item.productId,
                              item.variant,
                              item.quantity - 1,
                            )
                          }
                        >
                          -
                        </button>

                        <input
                          type="text"
                          readOnly
                          value={item.quantity}
                          className="input input-md h-7 w-8 border-0 bg-transparent p-0 text-center"
                        />

                        <button
                          disabled={item.quantity >= item.variant.quantity}
                          className="text-md h-7 w-7 cursor-pointer font-medium disabled:opacity-20"
                          onClick={() =>
                            item.quantity < item.variant.quantity &&
                            updateQuantity(
                              item.productId,
                              item.variant,
                              item.quantity + 1,
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>

        <div className="bg-white p-6">
          <ul className="list">
            <li className="list-row mb-6 p-0">
              <span className="list-col-grow text-lg font-medium">
                Subtotal
              </span>
              <span className="text-lg font-medium">
                ¥{subtotal.toLocaleString()}
              </span>
            </li>
          </ul>

          <button className="btn btn-primary w-full text-lg">Go to cart</button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default MiniCart;
