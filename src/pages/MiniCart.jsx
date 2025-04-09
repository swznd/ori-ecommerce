import { HeartIcon, TrashIcon } from '@heroicons/react/16/solid';

function MiniCart() {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box flex max-h-[80vh] w-full flex-col bg-white p-0">
        {/* Header */}
        <div className="p-6">
          <ul className="list">
            <li>
              <h3 className="text-xl font-bold">Your Cart</h3>
            </li>
          </ul>
        </div>

        {/* Scrollable Cart List */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 pb-6">
          <ul className="list space-y-6 [&_.list-row:after]:!border-b-0">
            {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
              <li key={index} className="list-row p-0">
                <img
                  src="/images/products/butter-1-yellow.jpg"
                  alt=""
                  className="size-20 rounded"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-medium">
                      Butter X Fabric Made in Japan
                    </h3>
                    <p className="text-sm">Color: Yellow</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <HeartIcon className="h-5 w-5 cursor-pointer text-gray-500 hover:text-red-500" />
                    <TrashIcon className="h-5 w-5 cursor-pointer text-gray-500 hover:text-neutral-700" />
                  </div>
                </div>
                <div>
                  <span className="text-base font-medium">¥2,300</span>
                  <div>Jumlah</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="bg-white p-6">
          <ul className="list">
            <li className="list-row mb-6 p-0">
              <span className="list-col-grow text-lg font-medium">
                Subtotal
              </span>
              <span className="text-lg font-medium">¥6,900</span>
            </li>
          </ul>
          <button className="btn btn-primary w-full text-lg">Go to cart</button>
        </div>
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default MiniCart;
