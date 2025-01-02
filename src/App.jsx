import { useSelector, useDispatch } from 'react-redux';
import { SET_COUNT } from './store';

function App() {
  const count = useSelector((store) => store.counter);
  const dispatch = useDispatch();

  return (
    <div className='p-5 flex flex-col min-h-screen'>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>

      <div className='flex flex-col py-2'>Vite + React + Tailwind CSS</div>

      <div>
        <button onClick={() => dispatch(SET_COUNT(1))}>Arttır</button>
        {count.value}
        <button onClick={() => dispatch(SET_COUNT(-1))}>Azalt</button>
      </div>
    </div>
  );
}

export default App;
