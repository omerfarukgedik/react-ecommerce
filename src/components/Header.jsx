import Portfolio from '../assets/icons/Portfolio.svg';
import Profile from '../assets/icons/Profile.svg';

export default function Header() {
  return (
    <header>
      <div className='wrapper'>
        <h1>Vardabit</h1>
        <input type='text' placeholder='Search..' />
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
