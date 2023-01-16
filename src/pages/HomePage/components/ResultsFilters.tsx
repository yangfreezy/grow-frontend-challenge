import React, { useState, useEffect, useCallback } from 'react';
import moment, { Moment } from 'moment';
import { AxiosResponse } from 'axios';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/material';
import { Country } from '../../../types/countries';
import NumberOfResultsSelector from './NumberOfResultsSelector';
import CountrySelector from './CountrySelector';
import DatePicker from './DatePicker';
import ErrorSnackbar from '../../../components/ErrorSnackbar';
import { WikiPageViewMetrics } from '../../../types/wiki';
import getResource from '../../../api/getResource';
import { getWikiReqUrl } from "../../../utils/wiki";

type ResultsFiltersProps = {
    setResults: (results : WikiPageViewMetrics[]) => void;
}

const resultsFilterContainerStyles = {
    display: 'flex', alignItems: 'center', marginBottom: 2, justifyContent: 'center'
};

const ResultsFilters = ({ setResults } : ResultsFiltersProps) => {
    const yesterday = moment().subtract(1, 'days')
    const [date, setDate] = useState<Moment | null>(yesterday);
    const [numResults, setNumResults] = useState(100);
    const [country, setCountry] = useState<Country>({ code: 'US', name: 'United States of America' });
    const [displayError, setDisplayError] = useState(false);

    const handleFetchError = (e: unknown) => {
      setDisplayError(true);
      console.error(e);
      // Report to error logging service
    }

    const handleFetchSuccess = (res: AxiosResponse) => {
      const { data: { items } } = res;
      if (Array.isArray(items)) {
        const [results] = items;
        const articles = results?.articles;
        setResults(articles.slice(0, +numResults));
      } else {
        throw new Error('Unexpected data type in response');
      }
    }

    const dateToRequest = date || yesterday;
    const { code: countryCode } = country;

    const fetchResults = useCallback(
      async () => {
        const url = getWikiReqUrl(dateToRequest, countryCode)
        getResource({
          url,
          onError: handleFetchError,
          onSuccess: handleFetchSuccess,
        })
      },
      [dateToRequest, countryCode]
    );
    
      useEffect(() => {
        fetchResults();
      }, [date, numResults, country]);

    return (
        <Container data-testid="ResultsFilters" sx={resultsFilterContainerStyles}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                  date={date}
                  onChange={(value: Moment | null) : void => setDate(value)}
              />
              <CountrySelector
                  country={country}
                  onChange={(value: Country) : void => setCountry(value)}
              />
              <NumberOfResultsSelector
                  results={numResults}
                  onChange={(value: string) : void => setNumResults(+value)}
              />
            </LocalizationProvider>
            <ErrorSnackbar
                displayError={displayError}
                onClose={() => setDisplayError(false)}
                message="Error fetching data!"
            />
        </Container>
    );
};

export default ResultsFilters;
