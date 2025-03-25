import FnnListProducts from '@/fnn-components/FnnListProducts';

function Home() {
  return (
    <>
      {/* Featured Fabrics Section */}
      <section className="py-14">
        <div className="flex flex-row items-center justify-between pb-8">
          <h2 className="text-2xl">Featured Fabrics</h2>
          <a href="" className="hover:underline">
            See more
          </a>
        </div>
        <FnnListProducts filter={{ sale: true, limit: 5 }} />
      </section>
    </>
  );
}
export default Home;
