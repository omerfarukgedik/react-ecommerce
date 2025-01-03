import { useNavigate } from 'react-router-dom';

export default function Product({ product }) {
  const navigate = useNavigate();

  return (
    <div className='product' onClick={() => navigate(`/${product.id}`)}>
      <img src={product.image} />

      <div className='product__info'>
        <span>{product.price} ₺</span>
        <label>{product.name}</label>
      </div>
      <button>Add to Cart</button>
    </div>
  );
}
