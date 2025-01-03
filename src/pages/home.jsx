import '../assets/styles/home.scss';

import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Product from '../components/Product';
import { useEffect } from 'react';
import Filter from '../components/Filter';

function Home() {
  const location = useLocation();

  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: 'products',
    queryFn: () =>
      fetch(
        'https://5fc9346b2af77700165ae514.mockapi.io/products?l=12&p=1',
      ).then((res) => res.json()),
  });

  useEffect(() => {
    console.log('SEARCH PARAMS:', location);
  }, [location]);

  return (
    <main id='home'>
      <div className='wrapper'>
        <Filter />
        <section id='products_area'>
          {isPending && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {products?.map((product) => (
            <Product key={`product_${product.id}`} product={product} />
          ))}
        </section>
        <section id='summary_area'>summary</section>
      </div>
    </main>
  );
}

export default Home;
