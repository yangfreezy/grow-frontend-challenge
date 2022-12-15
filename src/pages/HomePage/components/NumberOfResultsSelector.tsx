import React from 'react';
import { MenuItem, FormControl, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type NumberOfResultsSelectorProps = {
    results: number;
    onChange: (val : string) => void;
}

const NumberOfResultsSelector = ({ results, onChange } : NumberOfResultsSelectorProps) => {
    return (
        <FormControl>
            <InputLabel id="results-quantity-helper-label">Results</InputLabel>
            <Select
                aria-label="Number of Results Selector"
                labelId="results-quantity-select-label"
                id="results-quantity-select"
                value={String(results)}
                label="Results"
                onChange={(e : SelectChangeEvent) : void => onChange(e?.target?.value)}
            >
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={75}>75</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={200}>200</MenuItem>
            </Select>
          </FormControl>
    );
};

export default NumberOfResultsSelector;
