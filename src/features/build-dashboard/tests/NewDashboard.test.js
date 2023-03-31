import '@testing-library/jest-dom';

// redux
import { Provider } from 'react-redux'
import { store } from '../../../app/store'

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import NewDashboard from '../NewDashboard';

describe('NewDashboard', () => {

  it('should render without errors', () => {
    const { getByText } = render(
        <Provider store={store}>
        <MemoryRouter>
            <NewDashboard />
        </MemoryRouter>
        </Provider>
    );
    const headerTitle = getByText(/Create New Dashboard/i);
    const button = getByText(/continue/i);

    expect(headerTitle).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  
});