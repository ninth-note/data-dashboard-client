import '@testing-library/jest-dom';

// redux
import { Provider } from 'react-redux'
import { store } from '../../../../app/store'

import React from 'react';
import { render } from '@testing-library/react';
import DashLayout from '../DashLayout';
import { MemoryRouter } from 'react-router-dom'

test('renders DashLayout component', () => {

    const { getByText } = render(
        <Provider store={store}>
            <MemoryRouter >
                <DashLayout />
            </MemoryRouter>
            
        </Provider>
    );

    const headerTitle = getByText(/Show Plans/i);
    expect(headerTitle).toBeInTheDocument();
});