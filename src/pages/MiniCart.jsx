import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useCart } from '@/contexts/useCart';
import ProductImage from '@/fnn-components/ProductImage';
import FnnCartItemDetails from '@/fnn-components/cart/FnnCartItemDetails';
import FnnCartEmptyState from '@/fnn-components/cart/FnnCartEmptyState';
import FnnCartSubtotal from '@/fnn-components/cart/FnnCartSubtotal';
import slugify from '@/utils/slugify';

function MiniCart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const [isEmpty, setIsEmpty] = useState(false);
  const [isDelayFinished, setIsDelayFinished] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timeout;

    if (cartItems.length === 0) {
      timeout = setTimeout(() => {
        setIsEmpty(true);
        setIsDelayFinished(true);
      }, 1000);
    } else {
      setIsEmpty(false);
      setIsDelayFinished(false);
    }

    return () => clearTimeout(timeout);
  }, [cartItems]);

  return (
    <dialog id="mini_cart_modal" className="modal">
      <div className="modal-box flex max-h-[80vh] min-h-[50vh] w-full flex-col overflow-hidden bg-white p-0">
        <div className="p-6">
          <h3 className="text-xl font-bold">Your Cart</h3>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 pb-6">
          {isEmpty && isDelayFinished ? (
            <FnnCartEmptyState />
          ) : (
            <ul className="list space-y-6 [&_.list-row:after]:!border-b-0">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.li
                    key={item.productId + item.variant.color}
                    className="list-row p-0"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      className="size-20"
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
                      onRemove={() =>
                        removeFromCart(item.productId, item.variant)
                      }
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        <div className="bg-white p-6">
          <FnnCartSubtotal cartItems={cartItems} />

          <button
            disabled={cartItems.length === 0}
            className="btn btn-accent w-full text-lg"
            onClick={() => {
              document.getElementById('mini_cart_modal')?.close();
              navigate('/cart');
            }}
          >
            Go to cart
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default MiniCart;
