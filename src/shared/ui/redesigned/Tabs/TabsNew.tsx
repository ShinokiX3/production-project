import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
    value: string;
    content: React.ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    selected: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
    const { className, tabs, selected, onTabClick, direction = 'row' } = props;

    const clickHandler = useCallback(
        (tab: TabItem) => () => onTabClick(tab),
        [onTabClick],
    );

    return (
        <Flex
            gap="8"
            align="start"
            direction={direction}
            className={classNames(cls.Tabs, {}, [className])}
        >
            {tabs.map((tab) => {
                const isSelected = tab.value === selected;

                return (
                    <Card
                        variant={isSelected ? 'light' : 'normal'}
                        className={classNames(
                            cls.tab,
                            { [cls.selected]: isSelected },
                            [],
                        )}
                        key={tab.value}
                        onClick={clickHandler(tab)}
                        border="round"
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
});
