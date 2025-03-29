import FnnListProducts from '@/fnn-components/FnnListProducts';
import FnnNewsletter from '../fnn-components/FnnNewsletter';

function Home() {
  return (
    <>
      <section className="py-14">
        <div className="flex flex-row items-center justify-between pb-8">
          <h2 className="text-2xl">Select Your Themes</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="#"
            className="rounded-box flex aspect-[4/3] w-full cursor-pointer flex-col justify-end bg-[#CDC7E5] p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="space-y-2 text-gray-900">
              <h3 className="text-xl font-bold">Nintendo</h3>
              <p>
                Fuga aspernatur, iure voluptas consequuntur distinctio odio.
              </p>
            </div>
          </a>

          <a
            href="#"
            className="rounded-box flex aspect-[4/3] w-full cursor-pointer flex-col justify-end bg-[#C7FFDA] p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="space-y-2 text-gray-900">
              <h3 className="text-xl font-bold">Sanrio</h3>
              <p>
                Fuga aspernatur, iure voluptas consequuntur distinctio odio.
              </p>
            </div>
          </a>

          <a
            href="#"
            className="rounded-box flex aspect-[4/3] w-full cursor-pointer flex-col justify-end bg-[#FFEC51] p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="space-y-2 text-gray-900">
              <h3 className="text-xl font-bold">Disney</h3>
              <p>
                Fuga aspernatur, iure voluptas consequuntur distinctio odio.
              </p>
            </div>
          </a>

          <a
            href="#"
            className="rounded-box flex aspect-[4/3] w-full cursor-pointer flex-col justify-end bg-[#FF674D] p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="space-y-2 text-gray-900">
              <h3 className="text-xl font-bold">San-X</h3>
              <p>
                Fuga aspernatur, iure voluptas consequuntur distinctio odio.
              </p>
            </div>
          </a>
        </div>
      </section>

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
        <FnnListProducts filter={{ category: 'Kawaii', limit: 5 }} />
      </section>
      <section className="py-14">
        <FnnNewsletter />
      </section>
    </>
  );
}
export default Home;
