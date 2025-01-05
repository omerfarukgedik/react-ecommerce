import cartReducer, { addItem, increase, decrease } from '../../store/cart';

describe('Cart Reducer', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  test('should add new item to cart', () => {
    const initialState = {
      items: [],
      totalPrice: '₺0,00',
    };

    const newItem = {
      id: '1',
      name: 'Test Product',
      price: '100.00',
      quantity: 1,
    };

    const action = addItem(newItem);
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  test('should increase item quantity', () => {
    const initialState = {
      items: [
        {
          id: '1',
          name: 'Test Product',
          price: '100.00',
          quantity: 1,
        },
      ],
      totalPrice: '₺100,00',
    };

    const action = increase({ id: '1' });
    const state = cartReducer(initialState, action);

    expect(state.items[0].quantity).toBe(2);
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  test('should decrease item quantity', () => {
    const initialState = {
      items: [
        {
          id: '1',
          name: 'Test Product',
          price: '100.00',
          quantity: 2,
        },
      ],
      totalPrice: '₺200,00',
    };

    const action = decrease({ id: '1' });
    const state = cartReducer(initialState, action);

    expect(state.items[0].quantity).toBe(1);
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  test('should remove item when quantity becomes 0', () => {
    const initialState = {
      items: [
        {
          id: '1',
          name: 'Test Product',
          price: '100.00',
          quantity: 1,
        },
      ],
      totalPrice: '₺100,00',
    };

    const action = decrease({ id: '1' });
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(0);
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });
});
