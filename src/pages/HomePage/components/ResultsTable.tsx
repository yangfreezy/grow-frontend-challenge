import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Checkbox } from '@mui/material';
import { WikiPageViewMetrics } from '../../../types/wiki';
import { getArticleId, makeArticleTitleReadable } from '../../../utils/wiki';

type ResultsTableProps = {
    results: WikiPageViewMetrics[],
    pinnedArticles: WikiPageViewMetrics[],
    togglePinnedArticles: (article : WikiPageViewMetrics) => void,
    getIsArticleSelected: (res : WikiPageViewMetrics) => boolean,
}

export const ResultsTableHeader = () => (
    <TableHead>
        <TableRow>
            <TableCell align="left">📌</TableCell>
            <TableCell align="left">Rank</TableCell>
            <TableCell align="right">Article</TableCell>
            <TableCell align="right">Views</TableCell>
        </TableRow>
    </TableHead>
);

const ResultsTable = ({ results, getIsArticleSelected, togglePinnedArticles } : ResultsTableProps) => {
    return (
        <Table stickyHeader size="medium" data-testid="ResultsTable">
            <ResultsTableHeader />
            <TableBody>
            {
                results?.map((result : WikiPageViewMetrics, i: number) => {
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
                                    data-testid={`ResultsTableCheckbox${i}`}
                                    color="primary"
                                    checked={getIsArticleSelected(result)}
                                    onChange={() => togglePinnedArticles(result)}
                                    inputProps={{ 'aria-label': 'pin article' }}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {result.rank}
                            </TableCell>
                            <TableCell align="right">{makeArticleTitleReadable(result.article)}</TableCell>
                            <TableCell align="right">{result.views_ceil.toLocaleString("en-US")}</TableCell>
                        </TableRow>
                    )
                })
            }
            </TableBody>
        </Table> 
    );
};

export default ResultsTable;
