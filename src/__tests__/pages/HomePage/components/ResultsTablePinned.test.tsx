import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import ResultsTablePinned from '../../../../pages/HomePage/components/ResultsTablePinned';
import { getTestArticles } from '../../../../utils/testHelpers';
import moment from 'moment';
import { PinnedWikiArticle, WikiPageViewMetrics } from '../../../../types/wiki';

describe('ResultsTablePinned', () => {
    let component: RenderResult;
    const mockTogglePinnedArticles = jest.fn();

    const makeArticlesPinned = (articles: WikiPageViewMetrics[]) : PinnedWikiArticle[]=> (
        articles.map(a => ({ ...a, timestamp: moment().format("MMM Do, YYYY")}))
    )

    beforeEach(() => {
        component = render(
            <ResultsTablePinned
                pinnedArticles={makeArticlesPinned(getTestArticles(3))}
                togglePinnedArticles={mockTogglePinnedArticles}
            />
        );
    })

    it('renders', () => {
        expect(component).toBeTruthy();
    })

    it('matches the snapshot', () => {
        expect(component).toMatchSnapshot();
    })
})