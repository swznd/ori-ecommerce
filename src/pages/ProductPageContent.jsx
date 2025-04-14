import { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

import ProductImage from '@/fnn-components/ProductImage';
import ProductTitle from '@/fnn-components/ProductTitle';
import ProductPrice from '@/fnn-components/ProductPrice';
import ProductStockStatus from '@/fnn-components/ProductStockStatus';
import FnnProductColorOptions from '@/fnn-components/FnnProductColorOptions';
import { useCart } from '@/contexts/useCart';

function ProductPageContent({ product }) {
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(
    product.variants?.[0]?.color || 'Default Color',
  );
  const [selectedQty, setSelectedQty] = useState(1);

  useEffect(() => {
    setSelectedQty(1);
  }, [selectedColor]);

  const selectedVariant = useMemo(
    () => product.variants?.find((variant) => variant.color === selectedColor),
    [selectedColor, product.variants],
  );

  const maxQty = useMemo(() => {
    const available = selectedVariant?.quantity || 0;
    return Math.min(available, 10);
  }, [selectedVariant]);

  const handleAddToCart = () => {
    const itemPrice = product.price_sale ?? product.price;

    addToCart({
      productId: product.id,
      name: product.name,
      image: selectedVariant.images[0],
      price: itemPrice, // <- fix disini
      variant: selectedVariant,
      quantity: selectedQty,
    });

    toast.success('Added to cart!');
  };

  const allImages = useMemo(() => {
    const generalImages = (product.images || []).map((src, index) => ({
      src,
      color: null,
      index: `general-${index}`,
    }));

    const variantImages =
      product.variants?.flatMap((variant, variantIndex) =>
        (variant.images || []).map((src, imgIndex) => ({
          src,
          color: variant.color,
          index: `variant-${variantIndex}-${imgIndex}`,
        })),
      ) || [];

    return [...generalImages, ...variantImages];
  }, [product.images, product.variants]);

  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  useEffect(() => {
    const fallback = allImages.find((img) => img.color === selectedColor);
    if (fallback) setSelectedImage(fallback);
  }, [selectedColor, allImages]);

  const handleThumbnailClick = (img) => {
    setSelectedImage(img);
    if (img.color) {
      setSelectedColor(img.color);
    }
  };

  return (
    <section className="container mx-auto px-4 py-14">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <ProductImage
            src={selectedImage.src}
            alt={product.name}
            className="hover:opacity-100"
          />

          <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-6">
            {allImages.map((img) => (
              <button
                key={img.index}
                onClick={() => handleThumbnailClick(img)}
                className={`overflow-hidden rounded border ${
                  selectedImage.index === img.index
                    ? 'border-primary border-2'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={img.src}
                  alt="Thumbnail"
                  className="h-full w-full object-cover transition-all duration-200"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <ProductTitle
            name={product.name}
            category={product.details?.category}
            categoryClassName="text-md"
            nameClassName="text-2xl"
          />

          <ProductPrice
            price={product.price}
            salePrice={product.price_sale}
            className=""
            classNamePrice="text-2xl text-neutral font-medium"
            classNameOriginal="text-lg text-error font-medium line-through"
          />

          <div className="space-y-4">
            <p className="text-neutral text-sm font-medium">
              Color: {selectedColor}
            </p>

            <FnnProductColorOptions
              variants={product.variants}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              className="size-7"
            />

            <ProductStockStatus
              quantity={selectedVariant?.quantity}
              showAlways
              className="text-base font-medium"
            />
          </div>

          <label
            htmlFor="qty-select"
            className="select text-md w-full font-medium lg:w-1/3"
          >
            <span className="label text-neutral">Quantity</span>
            <select
              id="qty-select"
              value={selectedQty}
              onChange={(e) => setSelectedQty(parseInt(e.target.value))}
              disabled={maxQty === 0}
            >
              {Array.from({ length: maxQty }, (_, i) => i + 1).map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
          </label>

          <button
            className="btn btn-xl btn-block btn-accent text-white"
            disabled={maxQty === 0}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          <h2 className="mb-4 text-xl font-semibold">Product Details</h2>

          <ReactMarkdown>{product.description}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}

export default ProductPageContent;
