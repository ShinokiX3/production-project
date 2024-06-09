import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<Page data-testid="AdminPanelPage" className={classNames(cls.AdminPanelPage, {}, [className])}>
			{t('pages.adminPanel.title')}
		</Page>
	);
});

export default AdminPanelPage;
