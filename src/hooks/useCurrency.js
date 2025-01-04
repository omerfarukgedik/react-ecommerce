export default function useCurrency({
  format = 'tr-TR',
  currency = 'TRY',
  price = 0,
}) {
  return new Intl.NumberFormat(format, {
    style: 'currency',
    currency,
  }).format(price);
}
