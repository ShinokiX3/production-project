import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'widgets/Page/ui/Page';
import cls from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<Page className={classNames(cls.ForbiddenPage, {}, [className])}>
			{t('Access denied')}
		</Page>
	);
});

export default ForbiddenPage;
