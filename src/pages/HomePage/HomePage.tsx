import React from 'react';
import { useState } from 'react';
import { Container } from '@mui/system';

import useLocalStorageState from '../../hooks/useLocalStorageState';
import { WikiPageViewMetrics } from '../../types/wiki';
import { getArticleId } from '../../utils/wiki';
import ResultsFilters from './components/ResultsFilters';
import ArticleDetailModal from './components/ArticleDetailModal';
import PinnedResultsTable from './components/ResultsTablePinned';
import ResultsTable from './components/ResultsTable';
import WikiPageHeader from './components/WikiPageHeader';
import moment from 'moment';

const pageLayoutStyles = {
  display: 'flex', alignItems: 'center', flex: 1, flexDirection: 'column'
};

const HomePage = () => {
  const [pinnedArticles, setPinnedArticles] = useLocalStorageState([], 'pinnedArticles');
  const [results, setResults] = useState<WikiPageViewMetrics[]>([]);
  const [articleInDetail, setArticleInDetail] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);


  const getIsArticleSelected = (result : WikiPageViewMetrics, prev: WikiPageViewMetrics[] = pinnedArticles) : boolean => {
    const articleId = getArticleId(result);
    if (prev.some(a => getArticleId(a) === articleId)) return true;
    return false;
  }

  const handleDetailClick = (article: string) => {
    setArticleInDetail(article);
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const removePinnedArticle = (id: string) => pinnedArticles.filter((a : WikiPageViewMetrics) => getArticleId(a) !== id)

  const addPinnedArticle = (article: WikiPageViewMetrics) => {
    // Adding a timestamp since this article can persist multiple days and the rank will otherwise lose that context
    return pinnedArticles.concat([{ ...article, timestamp: moment().format("MMM Do, YYYY") }]);
  }

  const togglePinnedArticles = (result : WikiPageViewMetrics) => {
    setPinnedArticles((prev: WikiPageViewMetrics[]) => {
      const alreadySelected = getIsArticleSelected(result, prev);
      const articleId = getArticleId(result);
      return alreadySelected ? removePinnedArticle(articleId) : addPinnedArticle(result);
    });
  }

  const showPinnedArticles = pinnedArticles?.length > 0;

  return (
    <Container sx={pageLayoutStyles}>
      <WikiPageHeader />
      <ResultsFilters setResults={setResults} />
      <ArticleDetailModal modalOpen={modalOpen} onClose={handleModalClose} articleTitle={articleInDetail}/>
      <>
        {
          showPinnedArticles ? (
            <PinnedResultsTable
              pinnedArticles={pinnedArticles}
              togglePinnedArticles={togglePinnedArticles}
              handleDetailClick={handleDetailClick}
            />
          ) : null
        }
        <ResultsTable
          results={results}
          handleDetailClick={handleDetailClick}
          getIsArticleSelected={getIsArticleSelected}
          pinnedArticles={pinnedArticles}
          togglePinnedArticles={togglePinnedArticles}
        />
      </>
    </Container>
  )
};

export default HomePage;
