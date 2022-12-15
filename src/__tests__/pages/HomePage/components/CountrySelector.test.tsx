import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import CountrySelector from '../../../../pages/HomePage/components/CountrySelector';
import { getTestCountries } from '../../../../utils/testHelpers';

describe('CountrySelector', () => {
    let component: RenderResult;
    const mockOnChange = jest.fn();
    beforeEach(() => {
        component = render(<CountrySelector
            country={getTestCountries(1)[0]}
            onChange={mockOnChange}
        />);
    })

    it('renders', () => {
        expect(component).toBeTruthy();
    })

    it('matches the snapshot', () => {
        expect(component).toMatchSnapshot();
    })
})