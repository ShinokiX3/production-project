import { memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from '../../model/types/article';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (order: SortOrder) => void;
    onChangeSort: (sort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
	const {
		className,
		sort,
		order,
		onChangeOrder,
		onChangeSort
	} = props;
	const { t } = useTranslation();

	const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
		{
			value: 'asc',
			content: t('ascending'),
		},
		{
			value: 'desc',
			content: t('descending'),
		},
	], [t]);

	const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
		{
			value: ArticleSortField.CREATED,
			content: t('created at'),
		},
		{
			value: ArticleSortField.TITLE,
			content: t('title'),
		},
		{
			value: ArticleSortField.VIEWS,
			content: t('views'),
		},
	], [t]);

	return (
		<div className={classNames(cls.ArticleSortSelector, {}, [className])}>
			<Select
				options={sortFieldOptions}
				label={t('Sort for')}
				value={sort}
				onChange={onChangeSort}
			/>
			<Select
				options={orderOptions}
				label={t('for')}
				value={order}
				onChange={onChangeOrder}
				className={cls.order}
			/>
		</div>
	);
});
