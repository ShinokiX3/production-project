import { memo } from 'react';
import { t } from 'i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleView } from '../../model/consts/consts';
import { ToggleFeatures } from '@/shared/features';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ArticleListProps, getSkeletons } from './ArticleList';

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        target,
        view = ArticleView.PLATE,
    } = props;

    if (!isLoading && !articles.length) {
        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Text size={TextSize.L} title={t('Articles not found')} />
            </div>
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div
                    className={classNames(cls.ArticleList, {}, [
                        className,
                        cls[view],
                    ])}
                    data-testid="ArticleList"
                >
                    {articles.map((item) => (
                        <ArticleListItem
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                    {isLoading && getSkeletons(view)}
                </div>
            }
            on={
                <HStack
                    gap="16"
                    wrap="wrap"
                    className={classNames(cls.ArticleListRedesigned, {}, [])}
                    data-testid="ArticleList"
                >
                    {articles.map((item) => (
                        <ArticleListItem
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </HStack>
            }
        />
    );
});
