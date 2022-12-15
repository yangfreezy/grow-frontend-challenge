import { Country } from "../types/countries";
import countryData from '../../assets/countries.json';
import { WikiPageViewMetrics } from "../types/wiki";

export const getTestCountries = (num?: number) : Country[] => {
    if (!num) return countryData;
    return countryData.slice(0, num);
};

export const getTestArticles = (num: number) : WikiPageViewMetrics[] => {
    const arr = new Array(num);
    return arr.fill(0).map((a: WikiPageViewMetrics, i: number) => ({
        article: `testArticle${i}`,
        rank: i,
        views_ceil: i * 1000,
        project: 'en.wikipedia',
    })) 
};