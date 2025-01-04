import { useNavigate } from 'react-router-dom';
import { addItem } from '../store/cart';
import { useDispatch } from 'react-redux';
import useCurrency from '../hooks/useCurrency';

export default function Product({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCard = (e) => {
    e.stopPropagation();
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  return (
    <div className='product' onClick={() => navigate(`/${product.id}`)}>
      <img src={product.image} />

      <div className='product__info'>
        <span>{useCurrency({ price: product.price })}</span>
        <label>{product.name}</label>
      </div>
      <button onClick={addToCard}>Add to Cart</button>
    </div>
  );
}
