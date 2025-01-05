import '../assets/styles/home.scss';

import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Product from '../components/Product';
import { useEffect, useMemo, useState } from 'react';
import Filter from '../components/Filter';
import Summary from '../components/Summary';
import Pagination from '../components/Pagination';
import { API_URL, ITEMS_PER_PAGE } from '../constants';

const sort = [
  {
    key: 'old_to_new',
    value: 'Old to new',
    fn: (a, b) => a.id - b.id,
  },
  {
    key: 'new_to_old',
    value: 'New to old',
    fn: (a, b) => b.id - a.id,
  },
  {
    key: 'price_high_to_low',
    value: 'Price high to low',
    fn: (a, b) => b.price - a.price,
  },
  {
    key: 'price_low_to_high',
    value: 'Price Low to high',
    fn: (a, b) => a.price - b.price,
  },
];

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalProducts, setTotalProducts] = useState(0);

  async function fecthData() {
    return await fetch(API_URL).then((res) => res.json());
  }

  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: [`products`],
    queryFn: () => fecthData(),
  });

  const filteredData = useMemo(() => {
    let filterObject = {};
    searchParams.forEach((value, key) => {
      filterObject[key] = value;
    });

    // filter data
    const filteredData = products?.filter((item) => {
      return Object.keys(filterObject).every((key) => {
        if (key === 'search')
          return item.name
            .toLowerCase()
            .includes(filterObject[key].toLowerCase());
        else if (key === 'brands' || key === 'models') {
          return filterObject[key]
            .split(',')
            .includes(
              key == 'brands'
                ? item.brand.toLowerCase()
                : item.model.toLowerCase(),
            );
        } else return true;
      });
    });

    // sorting data
    const sortedData = filteredData?.sort((a, b) => {
      if (filterObject.sort === 'old_to_new') return a.id - b.id;
      if (filterObject.sort === 'new_to_old') return b.id - a.id;
      if (filterObject.sort === 'price_high_to_low') return b.price - a.price;
      if (filterObject.sort === 'price_low_to_high') return a.price - b.price;
      // return filterObject[]
      return a.id - b.id;
    });

    setTotalProducts(sortedData?.length);

    return sortedData?.slice(
      (filterObject.page - 1) * ITEMS_PER_PAGE,
      filterObject.page * ITEMS_PER_PAGE,
    );
  }, [searchParams, products]);

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
          {!isPending && !error && <Filter sort={sort} products={products} />}

          <section id='products_area'>
            {isPending && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {products &&
              filteredData?.map((product) => (
                <Product key={`product_${product.id}`} product={product} />
              ))}
          </section>

          <Summary />
        </div>
      </div>
      {!error && !isPending && (
        <Pagination
          totalItems={totalProducts}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={parseInt(searchParams.get('page'))}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}

export default Home;
