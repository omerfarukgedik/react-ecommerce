import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import Portfolio from '../assets/icons/Portfolio.svg';
import Profile from '../assets/icons/Profile.svg';

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cart = useSelector((store) => store.cart);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchParams((params) => {
      if (value) params.set('search', value);
      else params.delete('search');
      return params;
    });
  };

  return (
    <header>
      <div className='wrapper'>
        <Link to='/'>Vardabit</Link>
        <input
          onChange={handleSearchChange}
          type='text'
          placeholder='Search..'
          defaultValue={searchParams.get('search')}
        />
        <div className='actions'>
          <div className='flex items-center gap-2'>
            <img src={Portfolio} />
            <label>{cart.totalPrice}</label>
          </div>
          <div className='flex items-center gap-2'>
            <img src={Profile} />
            <label>Ömer</label>
          </div>
        </div>
      </div>
    </header>
  );
}
