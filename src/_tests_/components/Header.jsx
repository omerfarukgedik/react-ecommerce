import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Header from '../../components/Header';

const mockStore = configureStore([]);

describe('Header Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        totalPrice: '₺0,00',
      },
    });
  });

  test('renders basic header elements', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    // Check if main elements exist
    expect(screen.getByText('Vardabit')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search..')).toBeInTheDocument();
    expect(screen.getByText('₺0,00')).toBeInTheDocument();
    expect(screen.getByText('Ömer')).toBeInTheDocument();
  });

  test('handles search input change', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText('Search..');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });
});
