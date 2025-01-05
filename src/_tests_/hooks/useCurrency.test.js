import useCurrency from '../../hooks/useCurrency';

test('useCurrency formats price correctly', () => {
  const result = useCurrency({ price: 100.0 });
  expect(result).toBe('₺100,00');
});
