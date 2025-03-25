import products from '@/data/x.json';
import FnnCard from '@/fnn-components/FnnCard';

const FnnListProducts = ({ filter = {} }) => {
  const { limit, category, sale } = filter;
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.details?.category === category,
    );
  }

  if (sale) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price_sale !== null,
    );
  }

  const displayedProducts = limit
    ? filteredProducts.slice(0, limit)
    : filteredProducts;

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {displayedProducts.map((product) => (
        <FnnCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FnnListProducts;
