import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { HStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
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
		<HStack max justify="between" className={classNames('', {}, [className])}>
			<Text title={t('Профиль')} />
			{canEdit && (
				<div>
					{readonly ? (
						<Button
							theme={ThemeButton.OUTLINE}
							onClick={onEdit}
							data-testid="EditableProfileCardHeader.Edit"
						>
							{t('Редактировать')}
						</Button>
					) : (
						<HStack gap="8">
							<Button
								theme={ThemeButton.OUTLINE}
								onClick={onCancelEdit}
								data-testid="EditableProfileCardHeader.Cancel"
							>
								{t('Отменить')}
							</Button>
							<Button
								theme={ThemeButton.OUTLINE_RED}
								onClick={onSave}
								data-testid="EditableProfileCardHeader.Save"
							>
								{t('Сохранить')}
							</Button>
						</HStack>
					)}
				</div>
			)}

		</HStack>
	);
});
