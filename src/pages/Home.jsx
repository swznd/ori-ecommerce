import FnnListProducts from '@/fnn-components/FnnListProducts';
import FnnNewsletter from '../fnn-components/FnnNewsletter';

function Home() {
  return (
    <>
      {/* Featured Fabrics Section */}
      <section className="py-14">
        <div className="flex flex-row items-center justify-between pb-8">
          <h2 className="text-2xl">Sale</h2>
          <a href="" className="hover:underline">
            See more
          </a>
        </div>
        <FnnListProducts filter={{ sale: true, limit: 5 }} />
      </section>
      <section className="py-14">
        <div className="flex flex-row items-center justify-between pb-8">
          <h2 className="text-2xl">Licensed & Character Fabrics</h2>
          <a href="" className="hover:underline">
            See more
          </a>
        </div>
        <FnnListProducts filter={{ limit: 5 }} />
      </section>
      <section className="py-14">
        <div className="flex flex-row items-center justify-between pb-8">
          <h2 className="text-2xl">Kawaii Fabrics</h2>
          <a href="" className="hover:underline">
            See more
          </a>
        </div>
        <FnnListProducts filter={{ category: 'Sanrio', limit: 5 }} />
      </section>
      <section className="py-14">
        <FnnNewsletter />
      </section>
    </>
  );
}
export default Home;
