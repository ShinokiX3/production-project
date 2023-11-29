import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

const MainPage = () => {
	const { t } = useTranslation('main');

	return (
		<div>
			<Button theme={ThemeButton.OUTLINE}>Test</Button>
			{t('Главная страница')}
		</div>
	);
};

export default MainPage;
