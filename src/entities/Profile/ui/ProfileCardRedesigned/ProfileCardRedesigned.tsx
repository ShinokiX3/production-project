/* eslint-disable react/jsx-max-props-per-line */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation('profile');

    return (
        <HStack max justify="center">
            <Text
                variant="error"
                align="center"
                title={t('Error occur')}
                text={t('Try to reload page')}
            />
        </HStack>
    );
};

export const ProfileCardRedesignedSkeleton = () => (
    <Card padding="24" full>
        <VStack gap="32">
            <HStack max justify="center">
                <Skeleton border="100%" width={128} height={128} />
            </HStack>
            <HStack gap="32" max>
                <VStack gap="16" max>
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                </VStack>

                <VStack gap="16" max>
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                </VStack>
            </HStack>
        </VStack>
    </Card>
);

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
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
        onChangeCountry,
    } = props;

    const { t } = useTranslation('profile');

    return (
        <Card full padding="24" border="partial" className={className}>
            <VStack gap="32">
                {data?.avatar && (
                    <HStack max justify="center">
                        <Avatar size={120} src={data?.avatar} />
                    </HStack>
                )}
                <HStack gap="24" max>
                    <VStack gap="16" max>
                        <Input
                            value={data?.first}
                            label={t('First name')}
                            onChange={onChangeFirstname}
                            readonly={readonly}
                            data-testid="ProfileCard.Firstname"
                        />
                        <Input
                            value={data?.lastname}
                            label={t('Second name')}
                            onChange={onChangeLastname}
                            readonly={readonly}
                            data-testid="ProfileCard.Lastname"
                        />
                        <Input
                            value={data?.age}
                            label={t('Age')}
                            onChange={onChangeAge}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.city}
                            label={t('City')}
                            onChange={onChangeCity}
                            readonly={readonly}
                        />
                    </VStack>
                    <VStack gap="16" max>
                        <Input
                            value={data?.username}
                            label={t('User name')}
                            onChange={onChangeUsername}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.avatar}
                            label={t('Avatar (source url)')}
                            onChange={onChangeAvatar}
                            readonly={readonly}
                        />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readonly={readonly}
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountry}
                            readonly={readonly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
});
