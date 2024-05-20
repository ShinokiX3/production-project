import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DymanicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { getArticleDetailsError, getArticleDetailsIsLoading } from 'entities/Article/model/selectors/articleDetails';
import useInitialEffect from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/addCommentForm';
import { Page } from 'widgets/Page/ui/Page';
import { VStack } from 'shared/ui/Stack';
import {
	addCommentForArticle
} from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
	fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
	getArticleComments
} from '../../model/slices/articleDetailsCommentsSlice';
import {
	getArticleRecommendations
} from '../../model/slices/articleDetailsRecommendationsSlice';
import {
	getArticleRecommendationsError,
	getArticleRecommendationsIsLoading
} from '../../model/selectors/recommendations';
import {
	fetchArticleRecommendations
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../../model/slices';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();

	const dispatch = useAppDispatch();
	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleDetailsIsLoading);
	const commentsError = useSelector(getArticleDetailsError);

	const recommendations = useSelector(getArticleRecommendations.selectAll);
	const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
	const recommendationsError = useSelector(getArticleRecommendationsError);

	const onSendComment = useCallback((text: string) => {
		dispatch(addCommentForArticle(text));
	}, [dispatch]);

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
		dispatch(fetchArticleRecommendations());
	});

	if (!id) {
		return (
			<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				{t('Article not found')}
			</Page>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				<VStack max gap="16">
					<ArticleDetailsPageHeader />
					<ArticleDetails id={id} />
					<Text
						size={TextSize.L}
						className={cls.comment_title}
						title={t('Recommendations')}
					/>
					<ArticleList
						articles={recommendations}
						isLoading={recommendationsIsLoading}
						className={cls.recommendations}
						target="_blank"
					/>
					<Text
						size={TextSize.L}
						className={cls.comment_title}
						title={t('Comments')}
					/>
					<AddCommentForm onSendComment={onSendComment} />
					<CommentList
						isLoading={commentsIsLoading}
						comments={comments}
					/>
				</VStack>
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
