import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions, loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getLoginUsername } from 'features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from 'features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from 'features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from 'features/AuthByUsername/model/selectors/getLoginError/getLoginError';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DymanicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
	onSuccess: () => void;
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
	const { t } = useTranslation();

	const dispatch = useAppDispatch();

	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);

	const onChangeUsername = useCallback(
		(value: string) => dispatch(loginActions.setUsername(value)),
		[dispatch]
	);

	const onChangePassword = useCallback(
		(value: string) => dispatch(loginActions.setPassword(value)),
		[dispatch]
	);

	const login = useCallback(async () => {
		const result = await dispatch(loginByUsername({ username, password }));
		if (result.meta.requestStatus === 'fulfilled') {
			onSuccess();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, username, password]);

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
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
		</DynamicModuleLoader>
	);
});

export default LoginForm;
