import { useTranslation } from 'react-i18next';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text';
import { Input } from '@/shared/ui/Input/Input';
import { Loader } from '@/shared/ui/Loader/Loader';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import type { Currency } from '@/entities/Currency';
import { CurrencySelect } from '@/entities/Currency';
import type { Country } from '@/entities/Country';
import { CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	onChangeFirstname?: (value?: string) => void;
	onChangeLastname?: (value?: string) => void;
	onChangeAge?: (value?: string) => void;
	onChangeCity?: (value?: string) => void;
	onChangeUsername?: (value?: string) => void;
	onChangeAvatar?: (value?: string) => void;
	onChangeCurrency?: (currency?: Currency) => void;
	onChangeCountry?: (country?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
	const {
		className,
		data,
		isLoading,
		error,
		readonly,
		onChangeFirstname,
		onChangeLastname,
		onChangeAge,
		onChangeCity,
		onChangeUsername,
		onChangeAvatar,
		onChangeCurrency,
		onChangeCountry
	} = props;

	const { t } = useTranslation('profile');

	if (isLoading) {
		return (
			<HStack max justify="center" className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
				<Loader />
			</HStack>
		);
	}

	if (error) {
		return (
			<HStack max justify="center" className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
				<Text
					theme={TextTheme.ERROR}
					align={TextAlign.CENTER}
					title={t('Произошла ошибка')}
					text={t('Попробуйте обновить страницу')}
				/>
			</HStack>
		);
	}

	const mods: Mods = {
		[cls.editing]: !readonly,
	};

	return (
		<VStack max gap="8" className={classNames(cls.ProfileCard, mods, [className])}>
			{data?.avatar && (
				<HStack max justify="center" className={cls.avatar_wrapper}>
					<Avatar src={data?.avatar} />
				</HStack>
			)}
			<Input
				value={data?.first}
				placeholder={t('Ваше имя')}
				className={cls.input}
				onChange={onChangeFirstname}
				readonly={readonly}
				data-testid="ProfileCard.Firstname"
			/>
			<Input
				value={data?.lastname}
				placeholder={t('Ваша фамилия')}
				className={cls.input}
				onChange={onChangeLastname}
				readonly={readonly}
				data-testid="ProfileCard.Lastname"
			/>
			<Input
				value={data?.age}
				placeholder={t('Ваш возраст')}
				className={cls.input}
				onChange={onChangeAge}
				readonly={readonly}
			/>
			<Input
				value={data?.city}
				placeholder={t('Ваш город')}
				className={cls.input}
				onChange={onChangeCity}
				readonly={readonly}
			/>
			<Input
				value={data?.username}
				placeholder={t('Ваше имя пользователя')}
				className={cls.input}
				onChange={onChangeUsername}
				readonly={readonly}
			/>
			<Input
				value={data?.avatar}
				placeholder={t('Ваш аватар (ссылка)')}
				className={cls.input}
				onChange={onChangeAvatar}
				readonly={readonly}
			/>
			<CurrencySelect
				className={cls.input}
				value={data?.currency}
				onChange={onChangeCurrency}
				readonly={readonly}
			/>
			<CountrySelect
				className={cls.input}
				value={data?.country}
				onChange={onChangeCountry}
				readonly={readonly}
			/>
		</VStack>
	);
};
