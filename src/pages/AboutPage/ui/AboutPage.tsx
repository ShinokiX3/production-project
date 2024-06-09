import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AboutPage = () => {
	const { t } = useTranslation('about');

	// eslint-disable-next-line i18next/no-literal-string
	return <Page data-testid="AboutPage">{t('О сайте')}</Page>;
};

export default AboutPage;
