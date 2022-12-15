import React from 'react';
import moment, { Moment } from 'moment';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals/components/PureDateInput';

type DateSelectorProps = {
    date: Moment | null;
    onChange: (prop : Moment | null) => void;
}
  
const DateSelector = ({ onChange, date } : DateSelectorProps) => (
    <DatePicker
        aria-label="Date Selector"
        label="Date"
        // API doesn't return successes further back than this
        minDate={moment("07-01-2015", "MM-DD-YYYY")}
        // Can't request results in the future
        maxDate={moment()}
        disableFuture
        value={date}
        onChange={(value: Moment | null) : void => onChange(value)}
        renderInput={(params : MuiTextFieldProps) => <TextField {...params} />}
    />
);

export default DateSelector;