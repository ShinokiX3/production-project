import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { t } from 'i18next';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { PAGE_ID } from 'widgets/Page/ui/Page';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
	target?: React.HTMLAttributeAnchorTarget;
	virtualized?: boolean;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.PLATE ? 9 : 3)
	.fill(0)
	.map((item, index) => (
		<ArticleListItemSkeleton className={cls.card} key={index} view={view} />
	));

export const ArticleList = memo((props: ArticleListProps) => {
	const {
		className,
		articles,
		isLoading,
		target,
		view = ArticleView.PLATE,
		virtualized = true,
	} = props;

	const isList = view === ArticleView.LIST;
	const itemsPerRow = isList ? 1 : 4;
	const rowCount = isList ? articles.length : Math.ceil(articles.length / itemsPerRow);

	const rowRender = ({
		index, isScrolling, key, style,
	}: ListRowProps) => {
		const items = [];
		const fromIndex = index * itemsPerRow;
		const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

		for (let i = fromIndex; i < toIndex; i += 1) {
			items.push(
				<ArticleListItem
					article={articles[i]}
					view={view}
					target={target}
					key={`str${i}`}
					className={cls.card}
				/>,
			);
		}

		return (
			<div
				key={key}
				style={style}
				className={cls.row}
			>
				{items}
			</div>
		);
	};

	if (!isLoading && !articles.length) {
		return (
			<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
				<Text size={TextSize.L} title={t('Articles not found')} />
			</div>
		);
	}

	return (
		<WindowScroller
			scrollElement={document.getElementById(PAGE_ID) as Element}
		>
			{({
				height,
				width,
				registerChild,
				onChildScroll,
				isScrolling,
				scrollTop,
			}) => (
				<div
					ref={registerChild}
					className={classNames(cls.ArticleList, {}, [className, cls[view]])}
				>
					{virtualized ? (
						<List
							height={height ?? 700}
							rowCount={rowCount}
							rowHeight={isList ? 700 : 330}
							rowRenderer={rowRender}
							width={width ? width - 80 : 700}
							autoHeight
							onScroll={onChildScroll}
							isScrolling={isScrolling}
							scrollTop={scrollTop}
						/>
					) : (articles.map((item) => (
						<ArticleListItem
							article={item}
							view={view}
							target={target}
							key={item.id}
							className={cls.card}
						/>
					)))}
					{isLoading && getSkeletons(view)}
				</div>
			)}
		</WindowScroller>
	);
});
