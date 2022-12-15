
import { Moment } from 'moment';
import { WikiPageViewMetrics } from "../types/wiki";

export const makeArticleTitleReadable = (article : string ) : string => article.split('_').join(' ');

// API does not come with it's own unique ID, so this is a workaround
export const getArticleId = (a: WikiPageViewMetrics) => a.article + '-' + a.project;

export const getWikiReqUrl = (date : Moment, countryCode: string) : string => {
    const dateToDisplay = date.format("YYYY/MM/DD");
    // Internationalization logic here for international products
    // I would have limited this with ?limit={numResults}, but the API doesn't seem to support limits
    return `https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${countryCode}/all-access/${dateToDisplay}`;
};