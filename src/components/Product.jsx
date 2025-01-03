export default function Product({ product }) {
  return (
    <div className='product'>
      <img src={product.image} />

      <div className='product__info'>
        <span>{product.price} ₺</span>
        <label>{product.name}</label>
      </div>
      <button>Add to Cart</button>
    </div>
  );
}
