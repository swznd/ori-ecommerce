function FnnHeader() {
  return (
    <div className="bg-base-300">
      <div className="container mx-auto flex flex-row items-center justify-between px-4 py-3">
        <span>Ori from Japan</span>

        <ul className="flex flex-row gap-5">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
        </ul>

        <button
          className="btn"
          onClick={() => document.getElementById('mini_cart_modal').showModal()}
        >
          open modal
        </button>
      </div>
    </div>
  );
}

export default FnnHeader;
