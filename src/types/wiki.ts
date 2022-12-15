export interface WikiPageViewMetrics {
    article: string;
    rank: number;
    views_ceil: number;
    project: string;
}

export interface PinnedWikiArticle extends WikiPageViewMetrics {
    timestamp: string;
}