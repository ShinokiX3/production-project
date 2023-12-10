import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState/getLoginState';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const {
		username, password, isLoading, error
	} = useSelector(getLoginState);

	const onChangeUsername = useCallback(
		(value: string) => dispatch(loginActions.setUsername(value)),
		[dispatch]
	);

	const onChangePassword = useCallback(
		(value: string) => dispatch(loginActions.setPassword(value)),
		[dispatch]
	);

	const login = useCallback(
		() => dispatch(loginByUsername({ username, password })),
		[dispatch, username, password]
	);

	return (
		<div className={classNames(cls.LoginForm, {}, [className])}>
			<Text title={t('Форма авторизации')} />
			{error ? (
				<Text text={error} theme={TextTheme.ERROR} />
			) : null}
			<Input
				autofocus
				placeholder={t('Введите имя')}
				type="text"
				className={cls.Input}
				onChange={onChangeUsername}
				value={username}
			/>
			<Input
				placeholder={t('Введите пароль')}
				type="text"
				className={cls.Input}
				onChange={onChangePassword}
				value={password}
			/>
			<Button
				theme={ThemeButton.OUTLINE}
				className={cls.login_bttn}
				onClick={login}
				disabled={isLoading}
			>
				{t('Войти')}
			</Button>
		</div>
	);
});
