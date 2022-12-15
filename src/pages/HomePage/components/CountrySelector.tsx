import React from 'react';
import { MenuItem, FormControl, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import countryData from '../../../../assets/countries.json';

/*
    The countries.json file used here contains only the countries with functioning API responses.
    This info was not provided by the API so I had to scrape the API with a list of official ISO
    country codes to filter out the ones that 404'ed or errored out.
    
    I do realize this decouples our data with the API, but I decided I was okay with the tradeoff
    for a better user experience, since this would really only affect the least viewed countries respectively. 

    The alternatives I saw would have been to show a lot of countries to the user, but hundreds of them wouldn't work.
    Either that or somehow programatically determine which countries work with the API at runtime.
    Both of the above seemed to be an unfavorable tradeoff in either user experience and implementation complexity.
*/

interface Country {
    code: string;
    name: string;
}

type CountrySelectorProps = {
    country: Country;
    onChange: (val : Country) => void;
}

const stringMap: { [key: string]: string } = {};

const countryDictionary = countryData.reduce((acc, val) => {
    return {
        ...acc,
        [val.code]: val.name,
    }
}, stringMap);

const CountrySelector = ({ country, onChange } : CountrySelectorProps ) => {
    return (
        <FormControl data-testid="CountrySelector" sx={{ margin: 2.5 }}>
            <InputLabel id="country-quantity-helper-label">Country</InputLabel>
            <Select
                aria-label="Country Selector"
                labelId="country-quantity-select-label"
                id="country-quantity-select"
                value={country.code}
                data-testid="CountrySelectorSelect"
                label="Country"
                onChange={(e : SelectChangeEvent) : void => {
                    const { target: { value } } = e;
                    const country = { code: value, name: countryDictionary[value] };
                    onChange(country)
                }}
            >
            {
                countryData.map((country: Country) => (
                    <MenuItem data-testid={`MenuItem-${country.code}`} key={country.code} value={country.code}>{country.name}</MenuItem>
                ))
            }
            </Select>
          </FormControl>
    );
};

export default CountrySelector;
