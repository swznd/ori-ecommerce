import { useParams } from 'react-router-dom';
import products from '@/data/x.json';
import slugify from '@/utils/slugify';

function ProductPage() {
  const { slug } = useParams();

  // Auto-generate slug sementara dari nama produk
  const enrichedProducts = products.map((p) => ({
    ...p,
    slug: slugify(p.name),
  }));

  // Cari produk berdasarkan slug dari URL
  const product = enrichedProducts.find((p) => p.slug === slug);

  // Handle kalau produk nggak ditemukan
  if (!product) {
    return (
      <section className="container mx-auto px-4 py-14 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-14">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
        {/* Gambar */}
        <div
          className="rounded-box aspect-[4/3] bg-gray-200 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>

        {/* Info Produk */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-primary text-xl font-semibold">¥{product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
