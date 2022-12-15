import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import NumberOfResultsSelector from '../../../../pages/HomePage/components/NumberOfResultsSelector';

describe('NumberOfResultsSelector', () => {
    let component: RenderResult;
    const mockOnChange = jest.fn();
    beforeEach(() => {
        component = render(
            <NumberOfResultsSelector
                results={100}
                onChange={mockOnChange}
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