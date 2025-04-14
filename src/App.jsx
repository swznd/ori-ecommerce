import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import FnnHeader from '@/fnn-components/FnnHeader';
import FnnFooter from '@/fnn-components/FnnFooter';
import ScrollToTop from '@/fnn-components/ScrollToTop';
import FnnCard from '@/fnn-components/FnnCard';
import FnnListProducts from '@/fnn-components/FnnListProducts';

import Home from '@/pages/Home';
import ProductPage from '@/pages/ProductPage';
import MiniCart from '@/pages/MiniCart';
import CartPage from '@/pages/CartPage';

import products from '@/data/x.json';

function App() {
  const dummyProduct = products[0];

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <FnnHeader />
          <MiniCart />
          <main className="container mx-auto grow px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/test"
                element={<FnnCard product={dummyProduct} />}
              />
              <Route path="/list" element={<FnnListProducts />} />
            </Routes>
          </main>
          <FnnFooter />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
