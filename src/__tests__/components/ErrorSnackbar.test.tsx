import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import ErrorSnackbar from '../../components/ErrorSnackbar';

describe('ErrorSnackbar', () => {
    let component: RenderResult;
    beforeEach(() => {
        const mockOnClose = jest.fn();
        component = render(
            <ErrorSnackbar
                displayError={true}
                onClose={mockOnClose}
                message="Error"
            />
        );
    })

    it('renders', () => {
        expect(component).toBeTruthy();
    })

    it('matches the snapshot', () => {
        expect(component).toMatchSnapshot();
    })

})