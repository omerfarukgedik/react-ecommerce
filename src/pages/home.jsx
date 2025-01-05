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

  const handlePageChange = (page) => {
    setSearchParams((params) => {
      params.set('page', page);
      return params;
    });
  };

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
        // if (
        //   ['search', 'brands', 'models'].includes(key) &&
        //   filterObject.page != 1
        // )
        //   handlePageChange(1);

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
    const findSortAction = sort.find((s) => s.key == filterObject?.sort);
    const sortedData = filteredData?.sort((a, b) => findSortAction?.fn(a, b));

    setTotalProducts(sortedData?.length);

    // make pagination
    return sortedData?.slice(
      (filterObject.page - 1) * ITEMS_PER_PAGE,
      filterObject.page * ITEMS_PER_PAGE,
    );
  }, [searchParams, products]);

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
            {filteredData?.length == 0 && (
              <div className='flex items-center justify-center h-10 col-span-4 bg-white rounded-sm text-[1.2rem] text-red-500 font-bold'>
                No record found on this page {searchParams.get('page')}
              </div>
            )}

            {products &&
              filteredData?.map((product) => (
                <Product key={`product_${product.id}`} product={product} />
              ))}
          </section>

          <Summary />
        </div>
      </div>
      {!error && !isPending && totalProducts != 0 && (
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
