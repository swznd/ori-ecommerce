// 📦 Import eksternal
import { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

// 🧩 Import komponen internal
import ProductImage from '@/fnn-components/ProductImage';
import ProductTitle from '@/fnn-components/ProductTitle';
import ProductPrice from '@/fnn-components/ProductPrice';
import ProductStockStatus from '@/fnn-components/ProductStockStatus';
import FnnProductColorOptions from '@/fnn-components/FnnProductColorOptions';
import { useCart } from '@/contexts/useCart';

function ProductPageContent({ product }) {
  // 🌈 Warna varian yang dipilih
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.[0]?.color || 'Default Color',
  );

  // 📦 Jumlah quantity yang ingin dibeli
  const [selectedQty, setSelectedQty] = useState(1);

  useEffect(() => {
    setSelectedQty(1);
  }, [selectedColor]);

  // 🔍 Dapatkan varian yang sesuai warna terpilih
  const selectedVariant = useMemo(() => {
    return product.variants?.find((variant) => variant.color === selectedColor);
  }, [selectedColor, product.variants]);

  // 🔢 Batasi maksimum quantity (maks. 10, atau sesuai stok)
  const maxQty = useMemo(() => {
    const available = selectedVariant?.quantity || 0;
    return Math.min(available, 10);
  }, [selectedVariant]);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      variant: selectedVariant,
      quantity: selectedQty,
    });
    toast.success('Added to cart!');
  };

  // 🖼️ Gabungkan gambar umum dan gambar per varian
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

  // 📸 Gambar utama yang sedang ditampilkan
  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  // 🔄 Ganti gambar utama saat user pilih warna
  useEffect(() => {
    const fallback = allImages.find((img) => img.color === selectedColor);
    if (fallback) setSelectedImage(fallback);
  }, [selectedColor, allImages]);

  // 👆 Ganti gambar saat thumbnail diklik
  const handleThumbnailClick = (img) => {
    setSelectedImage(img);
    if (img.color) {
      setSelectedColor(img.color);
    }
  };

  return (
    <section className="container mx-auto px-4 py-14">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
        {/* 📸 Gambar Produk */}
        <div className="flex flex-col gap-4">
          <ProductImage
            src={selectedImage.src}
            alt={product.name}
            className="hover:opacity-100"
          />
          {/* 🖼️ Thumbnail */}
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

        {/* 📝 Info Produk */}
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

          {/* 🎨 Pilihan Warna & Status Stok */}
          <div className="space-y-4">
            <p className="text-neutral text-sm font-medium">
              Color: {selectedColor}
            </p>
            <FnnProductColorOptions
              variants={product.variants}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
            <ProductStockStatus
              quantity={selectedVariant?.quantity}
              showAlways
              className="text-base font-medium"
            />
          </div>

          {/* 🔢 Pilihan Quantity */}
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

          {/* 🛒 Tombol Add to Cart */}
          <button
            className="btn btn-xl btn-block btn-accent text-white"
            disabled={maxQty === 0}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* 📖 Deskripsi Produk */}
          <h2 className="mb-4 text-xl font-semibold">Product Details</h2>
          <ReactMarkdown>{product.description}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}

export default ProductPageContent;
