import moment from 'moment';
import { makeArticleTitleReadable, getArticleId, getWikiReqUrl } from "../../utils/wiki";
import { getTestArticles } from '../../utils/testHelpers';

describe('wiki utils', () => {
    describe('makeArticleTitleReadable', () => {
        it('removes underscores and replaces them with spaces', () =>{
            const testString = 'my_test_string';
            expect(makeArticleTitleReadable(testString)).toEqual('my test string');
        });
    });

    describe('getArticleId', () => {
        it('creates a string of the article name and the project', () =>{
            const testArticle = getTestArticles(1)[0];
            expect(getArticleId(testArticle)).toEqual('testArticle0-en.wikipedia');
        });
    });

    describe('getWikiReqUrl', () => {
        it('creates a string of the article name and the project', () =>{
            const testDate = moment();
            const expectedDateFormat = testDate.format("YYYY/MM/DD");
            expect(getWikiReqUrl(testDate, 'US')).toEqual(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/US/all-access/${expectedDateFormat}`);
        });
    });
});