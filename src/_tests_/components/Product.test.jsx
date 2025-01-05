import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Product from '../../components/Product';

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Product Component', () => {
  const mockProduct = {
    id: '12',
    name: 'Polestar Expedition',
    image: 'https://loremflickr.com/640/480/animals',
    price: '339.00',
    description: 'Test description',
    model: 'Colorado',
    brand: 'Bugatti',
  };

  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [],
        totalPrice: '₺0,00',
      },
    });
  });

  test('renders product details correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Product product={mockProduct} />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Polestar Expedition')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Add to Cart');
  });

  test('dispatches addItem action when Add to Cart is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Product product={mockProduct} />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByText('Add to Cart'));
    const actions = store.getActions();
    expect(actions[0].type).toBe('cart/addItem');
  });
});
