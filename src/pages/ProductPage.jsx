import { useParams } from 'react-router-dom';
import products from '@/data/x.json';
import slugify from '@/utils/slugify';
import ProductPageContent from './ProductPageContent';

function ProductPage() {
  const { slug } = useParams();

  const product = products
    .map((p) => ({
      ...p,
      slug: slugify(p.name),
    }))
    .find((p) => p.slug === slug);

  if (!product) {
    return (
      <section className="container mx-auto px-4 py-14 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </section>
    );
  }

  return <ProductPageContent product={product} />;
}

export default ProductPage;
