import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/Popups';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
	{ value: Currency.UAH, content: Currency.UAH },
	{ value: Currency.EUR, content: Currency.EUR },
	{ value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(({
	className, value, onChange, readonly
}: CurrencySelectProps) => {
	const { t } = useTranslation();

	const onChangeHandler = useCallback((value: string) => {
		onChange?.(value as Currency);
	}, [onChange]);

	return (
		<ListBox
			className={className}
			value={value}
			items={options}
			defaultValue={t('Select your currency')}
			label={t('Select your currency')}
			onChange={onChangeHandler}
			readonly={readonly}
			direction="top right"
		/>
	);
});
