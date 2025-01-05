import '../assets/styles/detail.scss';

import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../constants';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/cart';
import useCurrency from '../hooks/useCurrency';
import Portfolio from '../assets/icons/Portfolio.svg';
import { useMemo } from 'react';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);

  async function fecthData() {
    return await fetch(`${API_URL}/${id}`).then((res) => res.json());
  }

  const {
    isPending,
    error,
    data: product,
  } = useQuery({
    queryKey: [`product`],
    queryFn: () => fecthData(),
  });

  const addToCard = (e) => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  const productQuantity = useMemo(
    () => cart.items.find((item) => item.id === product?.id)?.quantity || 0,
    [cart.items, product?.id],
  );

  return (
    <main id='detail'>
      <div className='flex items-center justify-center'>
        <div className='wrapper'>
          {isPending && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {product && (
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
              <img src={product.image} alt={product.name} />
              <div className='flex flex-col gap-2 lg:gap-5'>
                <div className='flex items-center gap-2'>
                  <h1 className='text-xl font-bold lg:text-3xl'>
                    {product.name}
                  </h1>
                  <div className='px-2 text-white bg-[#2A59FE] rounded-md'>
                    {product.brand}
                  </div>
                  <div className='px-2 text-white bg-[#2A59FE] rounded-md'>
                    {product.model}
                  </div>
                </div>
                <label className='text-xl text-[#2A59FE]'>
                  {useCurrency({ price: product.price })}
                </label>
                <span className='text-sm text-slate-500'>
                  {new Date(product.createdAt).toLocaleString()}
                </span>
                <p>{product.description}</p>
                <button onClick={addToCard}>
                  Add to Cart{'  '}
                  <span className='font-bold'>({productQuantity})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
