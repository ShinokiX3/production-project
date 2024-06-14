export { getArticleDetailsData } from './model/selectors/articleDetails';

export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';

export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export type { Article } from './model/types/article';

export {
    ArticleView,
    ArticleType,
    ArticleSortField,
    ArticleBlockType,
} from './model/consts/consts';

export type { articleDetailsSlice } from './model/slice/articleDetailsSlice';

export { articleDetailsReducer } from './model/slice/articleDetailsSlice';

export { ArticleList } from './ui/ArticleList/ArticleList';

export { getArticleDetailsIsLoading } from './model/selectors/articleDetails';
