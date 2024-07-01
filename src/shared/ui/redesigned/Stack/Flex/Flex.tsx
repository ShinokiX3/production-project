import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'nowrap' | 'wrap';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

const justifyCls: Record<FlexJustify, string> = {
    start: cls.j_start,
    center: cls.j_center,
    end: cls.j_end,
    between: cls.j_between,
};

const alignCls: Record<FlexAlign, string> = {
    start: cls.a_start,
    center: cls.a_center,
    end: cls.a_end,
};

const directionCls: Record<FlexDirection, string> = {
    row: cls.d_row,
    column: cls.d_column,
};

const gapCls: Record<FlexGap, string> = {
    4: cls.g_4,
    8: cls.g_8,
    16: cls.g_16,
    24: cls.g_24,
    32: cls.g_32,
};

type DivProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export interface FlexProps extends DivProps {
    className?: string;
    children: React.ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexGap;
    max?: boolean;
    wrap?: FlexWrap;
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap = '16',
        max,
        wrap = 'nowrap',
        ...otherProps
    } = props;

    const classes = [
        className,
        justifyCls[justify],
        alignCls[align],
        directionCls[direction],
        gapCls[gap],
        cls[wrap],
    ];

    const mods: Mods = {
        [cls.max]: max,
    };

    return (
        <div className={classNames(cls.Flex, mods, classes)} {...otherProps}>
            {children}
        </div>
    );
};
