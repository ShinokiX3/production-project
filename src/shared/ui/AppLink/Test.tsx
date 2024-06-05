import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './title.module.scss';

interface titleProps {
	className?: string;
}

export const title = ({ className }: titleProps) => (
	<div className={classNames(cls.title, {}, [className])} />
);
