import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Comment } from 'entities/Comment/model/types/comment';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
	const { className, comment, isLoading } = props;

	if (isLoading) {
		return (
			<div className={classNames(cls.CommentCard, {}, [className])}>
				<div className={cls.header}>
					<Skeleton width={30} height={30} border="50%" />
					<Skeleton className={cls.username} width={100} height={16} />
				</div>
				<Skeleton className={cls.text} width="100%" height={50} />
			</div>
		);
	}

	return (
		<div className={classNames(cls.CommentCard, {}, [className])}>
			<div className={cls.header}>
				{comment.user?.avatar ? (
					<Avatar
						src={comment.user.avatar}
						size={30}
					/>
				) : null}
				<Text
					className={cls.username}
					title={comment.user.username}
				/>
			</div>
			<Text className={cls.text} text={comment.text} />
		</div>
	);
});
