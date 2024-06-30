import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleView } from '@/entities/Article';
import ListIconDeprecated from '@/shared/assets/icons/list-20-20.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-20-20.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import cls from './ArticleViewSelector.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.PLATE,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
    },
    {
        view: ArticleView.LIST,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (view: ArticleView) => () => {
        onViewClick?.(view);
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames(
                        cls.ArticleViewSelectorRedesigned,
                        {},
                        [className],
                    )}
                    border="round"
                    padding="8"
                >
                    <HStack gap="8">
                        {viewTypes.map((type) => (
                            <Icon
                                className={classNames(
                                    '',
                                    { [cls.selected]: type.view !== view },
                                    [],
                                )}
                                Svg={type.icon}
                                clickable
                                onClick={onClick(type.view)}
                            />
                        ))}
                    </HStack>
                </Card>
            }
            off={
                <div
                    className={classNames(cls.ArticleViewSelector, {}, [
                        className,
                    ])}
                >
                    {viewTypes.map((type) => (
                        <ButtonDeprecated
                            theme={ThemeButton.CLEAR}
                            onClick={onClick(type.view)}
                            key={type.view}
                        >
                            <IconDeprecated
                                width="24"
                                height="24"
                                className={classNames(
                                    '',
                                    { [cls.selected]: type.view !== view },
                                    [],
                                )}
                                Svg={type.icon}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
        />
    );
});
