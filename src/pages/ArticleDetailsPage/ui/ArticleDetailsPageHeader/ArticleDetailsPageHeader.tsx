import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { getCanEditArticle } from '../../model/selectors/article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo(
    (props: ArticleDetailsPageHeaderProps) => {
        const { className } = props;

        const { t } = useTranslation();
        const navigate = useNavigate();

        const article = useSelector(getArticleDetailsData);
        const canEdit = useSelector(getCanEditArticle);

        const onBackToList = useCallback(() => {
            navigate(getRouteArticles());
        }, [navigate]);

        const onEditArticle = useCallback(() => {
            if (article?.id) navigate(getRouteArticleEdit(article?.id));
        }, [navigate, article]);

        return (
            <HStack
                max
                justify="between"
                className={classNames('', {}, [className])}
            >
                <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                    {t('Back to articles')}
                </Button>
                {canEdit && (
                    <Button theme={ThemeButton.OUTLINE} onClick={onEditArticle}>
                        {t('Edit article')}
                    </Button>
                )}
            </HStack>
        );
    },
);
