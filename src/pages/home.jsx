import '../assets/styles/home.scss';
import { useQuery } from '@tanstack/react-query';
import Product from '../components/Product';
function Home() {
  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryFn: () =>
      fetch(
        'https://5fc9346b2af77700165ae514.mockapi.io/products?l=12&p=1',
      ).then((res) => res.json()),
  });

  return (
    <main id='home'>
      <div className='wrapper'>
        <section id='filter_area'>filter area {products?.length}</section>
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
