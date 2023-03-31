import '@testing-library/jest-dom';

// redux
import { Provider } from 'react-redux'
import { store } from '../../../app/store'

import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from '../Login'

test('renders Login component', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  const loginElement = screen.getByText(/login/i);
  expect(loginElement).toBeInTheDocument();
});