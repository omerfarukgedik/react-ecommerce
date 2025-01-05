import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Pagination';

test('Pagination changes pages correctly', () => {
  const handlePageChange = jest.fn();

  render(
    <Pagination
      totalItems={30}
      itemsPerPage={10}
      currentPage={1}
      onPageChange={handlePageChange}
    />,
  );

  fireEvent.click(screen.getByText('2'));
  expect(handlePageChange).toHaveBeenCalledWith(2);
});
