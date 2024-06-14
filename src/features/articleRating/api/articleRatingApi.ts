import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetQParams {
    userId: string;
    articleId: string;
}

interface MutationQParams {
    userId: string;
    articleId: string;
    rate: number;
    feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRatings: build.query<Rating[], GetQParams>({
            query: ({ userId, articleId }) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
        rateArticle: build.mutation<void, MutationQParams>({
            query: (params) => ({
                url: '/article-ratings',
                method: 'POST',
                body: params,
            }),
        }),
    }),
});

export const useGetArticleRatings = articleRatingApi.useGetArticleRatingsQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
