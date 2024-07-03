import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useArticleRecommendationList } from '../../api/articleRecommendationApi';
import { ToggleFeatures } from '@/shared/features';

interface ArticleRecommendationListProps {
    className?: string;
}

export const ArticleRecommendationList = memo(
    (props: ArticleRecommendationListProps) => {
        const { className } = props;
        const { t } = useTranslation();

        const {
            data: articles,
            isLoading,
            error,
        } = useArticleRecommendationList(3);

        if (isLoading || error || !articles) return null;

        return (
            <VStack
                gap="8"
                className={classNames('', {}, [className])}
                data-testid="ArticleRecommendationList"
            >
                <ToggleFeatures
                    feature="isAppRedesigned"
                    off={
                        <TextDeprecated
                            size={TextSize.L}
                            title={t('Recommendations')}
                        />
                    }
                    on={<Text size="l" title={t('Recommendations')} />}
                />
                <ArticleList
                    articles={articles}
                    isLoading={isLoading}
                    target="_blank"
                />
            </VStack>
        );
    },
);
