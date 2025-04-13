const FnnCartEmptyState = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-10"
      aria-live="polite"
    >
      <img
        src="/images/products/design-woman-sewing.png"
        alt="Empty Cart"
        className="h-40"
      />
      <p className="mt-4 text-sm text-gray-500">Your cart is empty.</p>
    </div>
  );
};

export default FnnCartEmptyState;
