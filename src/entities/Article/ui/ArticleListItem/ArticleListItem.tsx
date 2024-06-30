import { memo } from 'react';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/consts';
import { ToggleFeatures } from '@/shared/features';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: React.HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<ArticleListItemRedesigned {...props} />}
            off={<ArticleListItemDeprecated {...props} />}
        />
    );
});
