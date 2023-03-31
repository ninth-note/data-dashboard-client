import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFound from '../NotFound';

test('renders not found page', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
  const pageTitle = screen.getByText(/404/i);
  expect(pageTitle).toBeInTheDocument();
});

test('navigates to login page when button is clicked', () => {
  const history = createMemoryHistory();
  render(
    <MemoryRouter history={history}>
      <NotFound />
    </MemoryRouter>
  );
  const button = screen.getByText(/back to login/i);
  fireEvent.click(button);
  expect(history.location.pathname).toBe('/');
});