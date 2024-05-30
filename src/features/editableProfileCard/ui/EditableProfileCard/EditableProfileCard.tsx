import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import useInitialEffect from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DymanicModuleLoader/DynamicModuleLoader';
import { ProfileCard } from 'entities/Profile';
import { VStack } from 'shared/ui/Stack';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import cls from './EditableProfileCard.module.scss';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
    className?: string;
	id: string;
}

const reducers: ReducersList = {
	profile: profileReducer
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
	const { className, id } = props;
	const { t } = useTranslation('profile');

	const dispatch = useAppDispatch();

	const formData = useSelector(getProfileForm);
	const error = useSelector(getProfileError);
	const isLoading = useSelector(getProfileIsLoading);
	const readonly = useSelector(getProfileReadonly);
	const validateErrors = useSelector(getProfileValidateErrors);

	const validateErrorTranslates = {
		[ValidateProfileError.SERVER_ERROR]: t('Ошибка на стороне сервера'),
		[ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
		[ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
		[ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
		[ValidateProfileError.NO_DATA]: t('Данные не указаны'),
	};

	useInitialEffect(() => {
		if (id) {
			dispatch(fetchProfileData(id));
		}
	});

	const onChangeFirstname = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({ first: value || '' }));
	}, [dispatch]);

	const onChangeLastname = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({ lastname: value || '' }));
	}, [dispatch]);

	const onChangeAge = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({ age: Number(value || 18) }));
	}, [dispatch]);

	const onChangeCity = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({ city: value || '' }));
	}, [dispatch]);

	const onChangeUsername = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({ username: value || '' }));
	}, [dispatch]);

	const onChangeAvatar = useCallback((value?: string) => {
		dispatch(profileActions.updateProfile({ avatar: value || '' }));
	}, [dispatch]);

	const onChangeCurrency = useCallback((currency?: Currency) => {
		dispatch(profileActions.updateProfile({ currency }));
	}, [dispatch]);

	const onChangeCountry = useCallback((country?: Country) => {
		dispatch(profileActions.updateProfile({ country }));
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<VStack
				gap="8"
				max
				className={classNames(cls.EditableProfileCard, {}, [className])}
			>
				<EditableProfileCardHeader />
				{validateErrors?.length && validateErrors.map((error) => (
					<Text
						key={error}
						theme={TextTheme.ERROR}
						text={validateErrorTranslates[error]}
					/>
				))}
				<ProfileCard
					data={formData}
					isLoading={isLoading}
					error={error}
					readonly={readonly}
					onChangeFirstname={onChangeFirstname}
					onChangeLastname={onChangeLastname}
					onChangeCity={onChangeCity}
					onChangeAge={onChangeAge}
					onChangeUsername={onChangeUsername}
					onChangeAvatar={onChangeAvatar}
					onChangeCurrency={onChangeCurrency}
					onChangeCountry={onChangeCountry}
				/>
			</VStack>
		</DynamicModuleLoader>
	);
});
