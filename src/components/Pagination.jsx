export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  console.log('totalItems:', totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={i == currentPage ? 'active' : ''}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  return (
    <div className='pagination'>
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
