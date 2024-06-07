import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';

// Testing component

export const BugButton = () => {
	const [error, setError] = useState<boolean>(false);
	const { t } = useTranslation();

	const throwError = () => setError(true);

	useEffect(() => { if (error) throw new Error(); }, [error]);

	return (
		<Button onClick={throwError}>{t('Выбросить ошибку')}</Button>
	);
};
