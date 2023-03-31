import '@testing-library/jest-dom';

// redux
import { Provider } from 'react-redux'
import { store } from '../../../app/store'

import React from 'react';
import { render } from '@testing-library/react';
import BuildDashboard from '../BuildDashboard';
import { MemoryRouter } from 'react-router-dom'

test('renders BuildDashboard component', () => {

    const userChoices = {
        dashboard: 'my-dashboard',
        serviceName: 'finance'
    };

    const { getByText } = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[`/custom?userChoices=${encodeURIComponent(JSON.stringify(userChoices))}`]}>
                <BuildDashboard />
            </MemoryRouter>
            
        </Provider>
    );

    const headerTitle = getByText(/Complete/i);
    expect(headerTitle).toBeInTheDocument();
});