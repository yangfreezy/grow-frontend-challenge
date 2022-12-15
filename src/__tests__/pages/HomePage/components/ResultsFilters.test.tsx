import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import ResultsFilters from '../../../../pages/HomePage/components/ResultsFilters';

describe('ResultsFilters', () => {
    let component: RenderResult;
    const mockSetResults = jest.fn();

    beforeEach(() => {
        component = render(
            <ResultsFilters setResults={mockSetResults} />
        );
    })

    it('renders', () => {
        expect(component).toBeTruthy();
    })

    it('matches the snapshot', () => {
        expect(component).toMatchSnapshot();
    })
})