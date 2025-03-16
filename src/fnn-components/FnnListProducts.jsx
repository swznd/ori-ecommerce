import products from '@/data/x.json'; // Ambil data dari src/data/x.json
import FnnCard from '@/fnn-components/FnnCard';

const FnnListProducts = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-5">
      {products.map((product) => (
        <FnnCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FnnListProducts;
