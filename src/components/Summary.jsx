import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { decrease, increase } from '../store/cart';

export default function Cart() {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  return (
    <section id='summary_area'>
      <Card title='Cart'>
        {cart.items.length === 0 && <div>Your cart is empty.</div>}
        {cart.items.map((item) => (
          <div
            key={item.id}
            className='flex items-center justify-between gap-2 py-2 border-b border-slate-300 '
          >
            <div className='flex flex-col'>
              <label>{item.name}</label>
              <span className='text-[#2A59FE]'>{item.price}₺</span>
            </div>
            <div className='flex items-center'>
              <button
                className={`px-2 py-1 font-bold text-[1.2rem] text-white' ${
                  item.quantity === 1 ? 'bg-red-300' : 'bg-slate-300'
                }`}
                onClick={() => dispatch(decrease(item))}
              >
                {item.quantity === 1 ? 'x' : '-'}
              </button>
              <div className='py-2 px-3 bg-[#2A59FE] text-white font-bold select-none'>
                {item.quantity}
              </div>
              <button
                className='px-2 py-1 font-bold text-[1.2rem] bg-slate-300'
                onClick={() => dispatch(increase(item))}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </Card>

      <Card title='Checkout'>
        <label className='flex gap-2 text-[20px]'>
          Total Price:
          <span className='text-[#2A59FE] font-bold'>{cart.totalPrice}</span>
        </label>

        <button className='w-full py-2 mt-2 bg-[#2A59FE] text-white font-bold'>
          Checkout
        </button>
      </Card>
    </section>
  );
}
