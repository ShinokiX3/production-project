import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { Card } from '@/shared/ui/redesigned/Card';
import { ToggleFeatures } from '@/shared/features';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props;
        const { t } = useTranslation();

        const dispatch = useAppDispatch();
        const readonly = useSelector(getProfileReadonly);
        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileData);

        const canEdit = authData?.id === profileData?.id;

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card padding="24" full border="partial">
                        <HStack
                            max
                            justify="between"
                            className={classNames('', {}, [className])}
                        >
                            <Text title={t('Профиль')} />
                            {canEdit && (
                                <div>
                                    {readonly ? (
                                        <Button
                                            onClick={onEdit}
                                            data-testid="EditableProfileCardHeader.Edit"
                                        >
                                            {t('Редактировать')}
                                        </Button>
                                    ) : (
                                        <HStack gap="8">
                                            <Button
                                                onClick={onCancelEdit}
                                                data-testid="EditableProfileCardHeader.Cancel"
                                                color="error"
                                            >
                                                {t('Отменить')}
                                            </Button>
                                            <Button
                                                onClick={onSave}
                                                data-testid="EditableProfileCardHeader.Save"
                                                color="success"
                                            >
                                                {t('Сохранить')}
                                            </Button>
                                        </HStack>
                                    )}
                                </div>
                            )}
                        </HStack>
                    </Card>
                }
                off={
                    <HStack
                        max
                        justify="between"
                        className={classNames('', {}, [className])}
                    >
                        <TextDeprecated title={t('Профиль')} />
                        {canEdit && (
                            <div>
                                {readonly ? (
                                    <ButtonDeprecated
                                        theme={ThemeButton.OUTLINE}
                                        onClick={onEdit}
                                        data-testid="EditableProfileCardHeader.Edit"
                                    >
                                        {t('Редактировать')}
                                    </ButtonDeprecated>
                                ) : (
                                    <HStack gap="8">
                                        <ButtonDeprecated
                                            theme={ThemeButton.OUTLINE_RED}
                                            onClick={onCancelEdit}
                                            data-testid="EditableProfileCardHeader.Cancel"
                                        >
                                            {t('Отменить')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            theme={ThemeButton.OUTLINE}
                                            onClick={onSave}
                                            data-testid="EditableProfileCardHeader.Save"
                                        >
                                            {t('Сохранить')}
                                        </ButtonDeprecated>
                                    </HStack>
                                )}
                            </div>
                        )}
                    </HStack>
                }
            />
        );
    },
);
