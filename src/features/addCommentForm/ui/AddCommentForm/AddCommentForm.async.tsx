import { lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

export const AddCommentFormAsync = lazy<React.FC<AddCommentFormProps>>(() => new Promise((resolve) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	setTimeout(() => resolve(import('./AddCommentForm')), 1500);
}));
