import React from 'react';
import { useState } from 'react';
import { Container } from '@mui/system';

import useLocalStorageState from '../../hooks/useLocalStorageState';
import { WikiPageViewMetrics } from '../../types/wiki';
import { getArticleId } from '../../utils/wiki';
import ResultsFilters from './components/ResultsFilters';
import PinnedResultsTable from './components/ResultsTablePinned';
import ResultsTable from './components/ResultsTable';
import WikiPageHeader from './components/WikiPageHeader';
import moment from 'moment';

// ADD a loading animation for the api calls
// Add something for when there are no results


const pageLayoutStyles = {
  display: 'flex', alignItems: 'center', flex: 1, flexDirection: 'column'
};

const HomePage = () => {
  const [pinnedArticles, setPinnedArticles] = useLocalStorageState([], 'pinnedArticles');
  const [results, setResults] = useState<WikiPageViewMetrics[]>([]);

  const getIsArticleSelected = (result : WikiPageViewMetrics, prev: WikiPageViewMetrics[] = pinnedArticles) : boolean => {
    const uniqueArticleId = getArticleId(result);
    if (prev.some(a => getArticleId(a) === uniqueArticleId)) return true;
    return false;
  }

  const removePinnedArticle = (id: string) => pinnedArticles.filter((a : WikiPageViewMetrics) => getArticleId(a) !== id)

  const addPinnedArticle = (article: WikiPageViewMetrics) => {
    // Adding a timestamp since this article can persist multiple days and the rank will otherwise lose that context
    return pinnedArticles.concat([{ ...article, timestamp: moment().format("MMM Do, YYYY") }]);
  }

  const togglePinnedArticles = (result : WikiPageViewMetrics) => {
    setPinnedArticles((prev: WikiPageViewMetrics[]) => {
      const alreadySelected = getIsArticleSelected(result, prev);
      const uniqueArticleId = getArticleId(result);
      return alreadySelected ? removePinnedArticle(uniqueArticleId) : addPinnedArticle(result);
    });
  }

  const showPinnedArticles = pinnedArticles?.length > 0;

  return (
    <Container sx={pageLayoutStyles}>
      <WikiPageHeader />
      <ResultsFilters setResults={setResults} />
      <>
        {
          showPinnedArticles ? (
            <PinnedResultsTable
              pinnedArticles={pinnedArticles}
              togglePinnedArticles={togglePinnedArticles}
            />
          ) : null
        }
        <ResultsTable
          results={results}
          getIsArticleSelected={getIsArticleSelected}
          pinnedArticles={pinnedArticles}
          togglePinnedArticles={togglePinnedArticles}
        />
      </>
    </Container>
  )
};

export default HomePage;
