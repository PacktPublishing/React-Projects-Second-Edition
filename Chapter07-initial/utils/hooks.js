export function usePrice(number) {
  const rounded = Math.round(number * 100) / 100;

  return `$${rounded}`;
}
