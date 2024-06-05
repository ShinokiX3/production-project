import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import {
	useArticleRecommendationList
} from '../../api/articleRecommendationApi';

interface ArticleRecommendationListProps {
    className?: string;
}

export const ArticleRecommendationList = memo((props: ArticleRecommendationListProps) => {
	const { className } = props;
	const { t } = useTranslation();

	const { data: articles, isLoading, error } = useArticleRecommendationList(3);

	if (isLoading || error || !articles) return null;

	return (
		<VStack gap="8" className={classNames('', {}, [className])}>
			<Text
				size={TextSize.L}
				title={t('Recommendations')}
			/>
			<ArticleList
				articles={articles}
				isLoading={isLoading}
				target="_blank"
			/>
		</VStack>
	);
});
