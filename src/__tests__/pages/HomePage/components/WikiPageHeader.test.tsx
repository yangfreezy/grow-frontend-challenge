import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import WikiPageHeader from '../../../../pages/HomePage/components/WikiPageHeader';

describe('WikiPageHeader', () => {
    let component: RenderResult;
    beforeEach(() => {
        component = render(<WikiPageHeader/>);
    })

    it('renders', () => {
        expect(component).toBeTruthy();
    })

    it('matches the snapshot', () => {
        expect(component).toMatchSnapshot();
    })

})