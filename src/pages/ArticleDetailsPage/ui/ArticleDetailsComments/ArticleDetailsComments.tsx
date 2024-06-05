import { Suspense, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getArticleDetailsIsLoading } from '@/entities/Article/model/selectors/articleDetails';
import useInitialEffect from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader/Loader';
import {
	getArticleComments
} from '../../model/slices/articleDetailsCommentsSlice';
import {
	fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
	addCommentForArticle
} from '../../model/services/addCommentForArticle/addCommentForArticle';

interface ArticleDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
	const { className, id } = props;
	const { t } = useTranslation();

	const dispatch = useAppDispatch();

	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleDetailsIsLoading);

	const onSendComment = useCallback((text: string) => {
		dispatch(addCommentForArticle(text));
	}, [dispatch]);

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
	});

	return (
		<VStack max gap="16" className={classNames('', {}, [className])}>
			<Text
				size={TextSize.L}
				title={t('Comments')}
			/>
			<Suspense fallback={<Loader />}>
				<AddCommentForm onSendComment={onSendComment} />
			</Suspense>
			<CommentList
				isLoading={commentsIsLoading}
				comments={comments}
			/>
		</VStack>
	);
});
