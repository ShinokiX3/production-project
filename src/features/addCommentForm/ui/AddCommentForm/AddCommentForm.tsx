import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DymanicModuleLoader/DynamicModuleLoader';
import {
	getAddCommentFormError,
	getAddCommentFormText
} from '../../model/selectors/addCommentFormSelectors';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentForm';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
    className?: string;
	onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
	addCommentForm: addCommentFormReducer
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
	const { className, onSendComment } = props;
	const { t } = useTranslation();

	const dispatch = useAppDispatch();
	const text = useSelector(getAddCommentFormText);
	const error = useSelector(getAddCommentFormError);

	const onCommentChangeText = useCallback((value: string) => {
		dispatch(addCommentFormActions.setText(value));
	}, [dispatch]);

	const onSendHandler = useCallback(() => {
		onSendComment(text || '');
		onCommentChangeText('');
	}, [onCommentChangeText, onSendComment, text]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(cls.AddCommentForm, {}, [className])}>
				<Input
					className={cls.input}
					placeholder={t('Input text:')}
					value={text}
					onChange={onCommentChangeText}
				/>
				<Button
					onClick={onSendHandler}
					theme={ThemeButton.OUTLINE}
				>
					{t('Send')}
				</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default AddCommentForm;
