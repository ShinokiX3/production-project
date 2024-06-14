import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { ArticleType } from '@/entities/Article';

interface ArticleTypeTabsProps {
    className?: string;
    selected: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, selected, onChangeType } = props;

    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
        () =>
            Object.values(ArticleType).map((type) => ({
                value: type,
                content: t(type),
            })),
        [t],
    );

    const onTabClick = useCallback(
        (tab: TabItem) => onChangeType(tab.value as ArticleType),
        [onChangeType],
    );

    return (
        <Tabs
            tabs={typeTabs}
            selected={selected}
            onTabClick={onTabClick}
            className={classNames('', {}, [className])}
        />
    );
});
