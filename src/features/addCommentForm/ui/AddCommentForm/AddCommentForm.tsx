import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DymanicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/redesigned/Stack';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slices/addCommentForm';
import cls from './AddCommentForm.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { Card } from '@/shared/ui/redesigned/Card';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);

    const onCommentChangeText = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentChangeText('');
    }, [onCommentChangeText, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <HStack
                        max
                        justify="between"
                        className={classNames(cls.AddCommentForm, {}, [
                            className,
                        ])}
                        data-testid="AddCommentForm"
                    >
                        <InputDeprecated
                            className={cls.input}
                            placeholder={t('Input text:')}
                            value={text}
                            onChange={onCommentChangeText}
                            data-testid="AddCommentForm.Input"
                        />
                        <ButtonDeprecated
                            onClick={onSendHandler}
                            theme={ThemeButton.OUTLINE}
                            data-testid="AddCommentForm.Button"
                        >
                            {t('Send')}
                        </ButtonDeprecated>
                    </HStack>
                }
                on={
                    <Card padding="24" border="round" full>
                        <HStack
                            max
                            gap="16"
                            justify="between"
                            className={classNames(
                                cls.AddCommentFormRedesigned,
                                {},
                                [className],
                            )}
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
                                variant="outline"
                                data-testid="AddCommentForm.Button"
                            >
                                {t('Send')}
                            </Button>
                        </HStack>
                    </Card>
                }
            />
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
