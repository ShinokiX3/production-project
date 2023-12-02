import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.LoginForm, {}, [className])}>
			<Input autofocus placeholder={t('Введите имя')} type="text" className={cls.Input} />
			<Input placeholder={t('Введите пароль')} type="text" className={cls.Input} />
			<Button className={cls.login_bttn}>{t('Войти')}</Button>
		</div>
	);
};
