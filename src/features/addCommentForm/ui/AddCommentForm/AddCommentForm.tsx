import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/Input';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DymanicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/Stack';
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
			<HStack
				max
				justify="between"
				className={classNames(cls.AddCommentForm, {}, [className])}
				data-testid="AddCommentForm"
			>
				<Input
					className={cls.input}
					placeholder={t('Input text:')}
					value={text}
					onChange={onCommentChangeText}
					data-testid="AddCommentForm.Input"
				/>
				<Button
					onClick={onSendHandler}
					theme={ThemeButton.OUTLINE}
					data-testid="AddCommentForm.Button"
				>
					{t('Send')}
				</Button>
			</HStack>
		</DynamicModuleLoader>
	);
});

export default AddCommentForm;
