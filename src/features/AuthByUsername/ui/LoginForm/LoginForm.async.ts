import { lazy } from 'react';
import { LoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<React.FC<LoginFormProps>>(() => new Promise((resolve) => {
	setTimeout(() => resolve(import('./LoginForm')), 1500);
}));
