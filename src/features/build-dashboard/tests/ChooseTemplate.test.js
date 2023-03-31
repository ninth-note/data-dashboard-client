import '@testing-library/jest-dom';

// redux
import { Provider } from 'react-redux'
import { store } from '../../../app/store'

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ChooseTemplate from '../ChooseTemplate';
import { services } from '../../../config'

describe('ChooseTemplate', () => {
  it('renders correctly with user choices', () => {
    const userChoices = {
      dashboard: 'my-dashboard',
      service: services.options[0]
    };

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/templates?userChoices=${encodeURIComponent(JSON.stringify(userChoices))}`]}>
          <Routes>
            <Route path="/templates" element={<ChooseTemplate />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const headerTitle = getByText(/Choose Dashboard Template/i);
    expect(headerTitle).toBeInTheDocument();

    // verify that the ChooseTemplate component receives the correct props
    expect(screen.getByText(userChoices.dashboard)).toBeInTheDocument();
  });
});