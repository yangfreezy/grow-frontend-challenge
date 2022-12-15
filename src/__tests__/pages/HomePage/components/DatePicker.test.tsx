import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import DatePicker from '../../../../pages/HomePage/components/DatePicker';
import moment from 'moment';

describe('DatePicker', () => {
    let component: RenderResult;
    const mockOnChange = jest.fn();
    const mockDate = moment();
    beforeEach(() => {
        component = render(
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    date={mockDate}
                    onChange={mockOnChange}
                />
            </LocalizationProvider>
        );
    })

    it('renders', () => {
        expect(component).toBeTruthy();
    })

    it('matches the snapshot', () => {
        expect(component).toMatchSnapshot();
    })
})