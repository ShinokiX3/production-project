import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<Page data-testid="ForbiddenPage" className={classNames('', {}, [className])}>
			{t('Access denied')}
		</Page>
	);
});

export default ForbiddenPage;
