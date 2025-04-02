import { useState, useMemo, useEffect } from 'react';
import ProductImage from '@/fnn-components/ProductImage';
import ProductTitle from '@/fnn-components/ProductTitle';
import ProductPrice from '@/fnn-components/ProductPrice';
import ProductStockStatus from '@/fnn-components/ProductStockStatus';
import FnnProductColorOptions from '@/fnn-components/FnnProductColorOptions';

function ProductPageContent({ product }) {
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.[0]?.color || 'Default Color',
  );

  const selectedVariant = useMemo(() => {
    return product.variants?.find((variant) => variant.color === selectedColor);
  }, [selectedColor, product.variants]);

  // Gabungkan gambar umum + semua varian
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

  // Gambar utama
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
        {/* Gambar Produk */}
        <div className="flex flex-col gap-4">
          <ProductImage
            src={selectedImage.src}
            alt={product.name}
            className="hover:opacity-100"
          />

          {/* Thumbnail */}
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
                  alt={`Thumbnail`}
                  className="h-full w-full object-cover transition-all duration-200"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info Produk */}
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

          <ProductStockStatus
            quantity={selectedVariant?.quantity}
            showAlways
            className="text-base font-medium"
          />

          <div className="space-y-2">
            <p className="text-neutral text-sm font-medium">
              Color: {selectedColor}
            </p>
            <FnnProductColorOptions
              variants={product.variants}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
          </div>
          <button className="btn btn-xl btn-block btn-accent text-white">
            Add to Cart
          </button>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>

      {/* Deskripsi lengkap */}
      <section className="mt-16 border-t pt-10">
        <h2 className="mb-4 text-xl font-semibold">Product Details</h2>
        <p className="leading-relaxed text-gray-700">
          {product.details?.long_description ||
            'No additional information available.'}
        </p>
      </section>
    </section>
  );
}

export default ProductPageContent;
