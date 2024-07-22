import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => SkeletonDeprecated,
    on: () => SkeletonRedesigned,
});

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <VStack
                max
                gap="8"
                className={classNames(cls.CommentCard, {}, [
                    className,
                    cls.loading,
                ])}
                data-testid="CommentCard.Loading"
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton
                        className={cls.username}
                        width={100}
                        height={16}
                    />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <VStack
                    max
                    gap="8"
                    className={classNames(cls.CommentCard, {}, [className])}
                    data-testid="CommentCard.Content"
                >
                    <AppLinkDeprecated
                        to={getRouteProfile(comment.user.id)}
                        className={cls.header}
                    >
                        {comment.user?.avatar ? (
                            <AvatarDeprecated
                                src={comment.user.avatar}
                                size={30}
                            />
                        ) : null}
                        <TextDeprecated
                            className={cls.username}
                            title={comment.user.username}
                        />
                    </AppLinkDeprecated>
                    <TextDeprecated className={cls.text} text={comment.text} />
                </VStack>
            }
            on={
                <Card padding="24" border="partial" full>
                    <VStack
                        max
                        gap="8"
                        className={classNames(cls.CommentCardRedesigned, {}, [
                            className,
                        ])}
                        data-testid="CommentCard.Content"
                    >
                        <AppLink to={getRouteProfile(comment.user.id)}>
                            <HStack gap="8">
                                {comment.user?.avatar ? (
                                    <Avatar
                                        src={comment.user.avatar}
                                        size={30}
                                    />
                                ) : null}
                                <Text text={comment.user.username} bold />
                            </HStack>
                        </AppLink>
                        <Text text={comment.text} />
                    </VStack>
                </Card>
            }
        />
    );
});
