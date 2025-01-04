import '../assets/styles/home.scss';

import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Product from '../components/Product';
import { useEffect } from 'react';
import Filter from '../components/Filter';
import Summary from '../components/Summary';
import Pagination from '../components/Pagination';
import { API_URL, ITEMS_PER_PAGE } from '../constants';

function Home() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  async function fecthData() {
    return await fetch(API_URL).then((res) => res.json());
  }

  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: `products`,
    queryFn: () => fecthData(),
  });

  useEffect(() => {
    console.log('SEARCH PARAMS:', location.search);
  }, [location.search]);

  const handlePageChange = (page) => {
    setSearchParams((params) => {
      params.set('page', page);
      return params;
    });
  };

  useEffect(() => {
    const page = searchParams.get('page') || 1;
    handlePageChange(page);
  }, []);

  return (
    <main id='home'>
      <div className='flex items-center justify-center'>
        <div className='wrapper'>
          <Filter products={products} />
          <section id='products_area'>
            {isPending && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {products
              ?.slice(
                (searchParams.get('page') - 1) * ITEMS_PER_PAGE,
                searchParams.get('page') * ITEMS_PER_PAGE,
              )
              .map((product) => (
                <Product key={`product_${product.id}`} product={product} />
              ))}
          </section>

          <Summary />
        </div>
      </div>
      {!error && !isPending && (
        <Pagination
          totalItems={products?.length}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={parseInt(searchParams.get('page'))}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}

export default Home;
