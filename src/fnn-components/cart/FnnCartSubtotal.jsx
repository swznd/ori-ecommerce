const FnnCartSubtotal = ({ cartItems }) => {
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.price_sale ?? item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  return (
    <ul className="list">
      <li className="list-row mb-6 p-0">
        <span className="list-col-grow text-lg font-medium">Subtotal</span>
        <span className="text-lg font-medium">
          ¥{subtotal.toLocaleString()}
        </span>
      </li>
    </ul>
  );
};

export default FnnCartSubtotal;
