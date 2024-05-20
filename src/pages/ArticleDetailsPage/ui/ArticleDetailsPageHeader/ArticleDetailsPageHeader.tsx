import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article';
import { HStack } from 'shared/ui/Stack';
import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
	const { className } = props;

	const { t } = useTranslation();
	const navigate = useNavigate();

	const article = useSelector(getArticleDetailsData);
	const canEdit = useSelector(getCanEditArticle);

	const onBackToList = useCallback(() => {
		navigate(RoutePath.articles);
	}, [navigate]);

	const onEditArticle = useCallback(() => {
		navigate(`${RoutePath.article_details}${article?.id}/edit`);
	}, [navigate, article?.id]);

	return (
		<HStack max justify="between" className={classNames('', {}, [className])}>
			<Button
				theme={ThemeButton.OUTLINE}
				onClick={onBackToList}
			>
				{t('Back to articles')}
			</Button>
			{canEdit && (
				<Button
					theme={ThemeButton.OUTLINE}
					onClick={onEditArticle}
				>
					{t('Edit article')}
				</Button>
			)}
		</HStack>
	);
});
