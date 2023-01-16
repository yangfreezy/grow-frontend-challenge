import React from 'react';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, Checkbox } from '@mui/material';
import { PinnedWikiArticle } from '../../../types/wiki';
import { getArticleId, makeArticleTitleReadable } from '../../../utils/wiki';

type PinnedResultsTableProps = {
    pinnedArticles: PinnedWikiArticle[],
    togglePinnedArticles: (article : PinnedWikiArticle) => void,
    handleDetailClick: (articleTitle : string) => void,
}

export const PinnedResultsTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell align="left">📍</TableCell>
      <TableCell align="left">Rank</TableCell>
      <TableCell align="right">Date</TableCell>
      <TableCell align="right">Article</TableCell>
      <TableCell align="right">Views</TableCell>
    </TableRow>
  </TableHead>
)

/*
  Note: I realize I could have potentially DRY'ed up this component and the ResultsTable, but it felt like
  a situation where it wouldn't have necessarily produced much benefit in actuality, especially given the 
  scope of the project. I do like to abstract code but it felt a bit like overkill to pass in an emoji, add
  a flag to display or not to display the date (since this component has a date and the other doesn't), etc;
*/

const PinnedResultsTable = ({ pinnedArticles, togglePinnedArticles, handleDetailClick } : PinnedResultsTableProps) => {
    return (
        <Table stickyHeader size="medium" data-testid="PinnedResultsTable" >
          <PinnedResultsTableHeader />
          <TableBody>
            {
              pinnedArticles?.map((result : PinnedWikiArticle) => {
                if (!result) return null;
                const uniqueId = getArticleId(result);
                return (
                  <TableRow
                    hover
                    key={uniqueId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked
                        onChange={() => togglePinnedArticles(result)}
                        inputProps={{ 'aria-label': 'pin article' }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {`${result.rank}`}
                    </TableCell>
                    <TableCell align="right">{result.timestamp}</TableCell>
                    <TableCell align="right">
                        <Button
                            disabled={false}
                            size="medium"
                            variant="text"
                            onClick={() => {
                                handleDetailClick(result.article);
                            }}
                        >{makeArticleTitleReadable(result.article)}</Button>
                    </TableCell>
                    <TableCell align="right">{result.views_ceil.toLocaleString("en-US")}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
      </Table>  
    );
};

export default PinnedResultsTable;
