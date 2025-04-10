export function getSelectedVariant(variants = [], selectedColor) {
  return (
    variants.find((variant) => variant.color === selectedColor) ||
    variants[0] ||
    {}
  );
}
