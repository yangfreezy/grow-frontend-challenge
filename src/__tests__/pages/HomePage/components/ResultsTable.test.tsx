import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import ResultsTable from '../../../../pages/HomePage/components/ResultsTable';
import { getTestArticles } from '../../../../utils/testHelpers';

describe('ResultsTable', () => {
    let component: RenderResult;
    const mockTogglePinnedArticles = jest.fn();
    const mockGetIsArticleSelected = jest.fn();
    beforeEach(() => {
        component = render(
            <ResultsTable
                results={getTestArticles(100)}
                pinnedArticles={[]}
                togglePinnedArticles={mockTogglePinnedArticles}
                getIsArticleSelected={mockGetIsArticleSelected}
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