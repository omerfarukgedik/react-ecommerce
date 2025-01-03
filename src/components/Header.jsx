import Portfolio from '../assets/icons/Portfolio.svg';
import Profile from '../assets/icons/Profile.svg';
import { useSearchParams } from 'react-router-dom';

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();

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
        <h1>Vardabit</h1>
        <input
          onChange={handleSearchChange}
          type='text'
          placeholder='Search..'
          defaultValue={searchParams.get('search')}
        />
        <div className='actions'>
          <div className='flex items-center gap-2'>
            <img src={Portfolio} />
            <label>1772.00 TL</label>
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
