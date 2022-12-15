import React from "react";
import HomePage from "../../../pages/HomePage/HomePage";
import { render, RenderResult } from '@testing-library/react';

describe('HomePage', () => {
    let app: RenderResult;
    beforeEach(() => {
        app = render(<HomePage/>);
    })
    it('renders', () => {
        expect(app).toBeTruthy();
    })

    it('matches the snapshot', () => {
    expect(app).toMatchSnapshot();
    })

    it('renders the header', () => {
        expect(app.getByTestId('WikiPageHeader')).toBeTruthy();
    })

    it('renders the results filters', () => {
        expect(app.getByTestId('ResultsFilters')).toBeTruthy();
    })

    it('does not render the pinned results table initially', () => {
        expect(app.queryByTestId('PinnedResultsTable')).toBeFalsy();
    })

    it('renders the results table', () => {
        expect(app.getByTestId('ResultsTable')).toBeTruthy();
    })

});
