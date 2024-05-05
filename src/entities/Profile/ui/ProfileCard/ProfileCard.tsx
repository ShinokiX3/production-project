import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Profile } from 'entities/Profile/model/types/profile';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { CountrySelect } from 'entities/Country/ui/CountrySelect/CountrySelect';
import { Country } from 'entities/Country';
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
			<div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
				<Loader />
			</div>
		);
	}

	if (error) {
		return (
			<div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
				<Text
					theme={TextTheme.ERROR}
					align={TextAlign.CENTER}
					title={t('Произошла ошибка')}
					text={t('Попробуйте обновить страницу')}
				/>
			</div>
		);
	}

	const mods: Mods = {
		[cls.editing]: !readonly,
	};

	return (
		<div className={classNames(cls.ProfileCard, mods, [className])}>
			<div className={cls.data}>
				{data?.avatar && (
					<div className={cls.avatar_wrapper}>
						<Avatar src={data?.avatar} />
					</div>
				)}
				<Input
					value={data?.first}
					placeholder={t('Ваше имя')}
					className={cls.input}
					onChange={onChangeFirstname}
					readonly={readonly}
				/>
				<Input
					value={data?.lastname}
					placeholder={t('Ваша фамилия')}
					className={cls.input}
					onChange={onChangeLastname}
					readonly={readonly}
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
			</div>
		</div>
	);
};