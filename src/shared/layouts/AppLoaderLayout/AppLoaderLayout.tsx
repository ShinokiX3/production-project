import React, { memo } from 'react';
import cls from './AppLoaderLayout.module.scss';
import { Skeleton } from '../../ui/redesigned/Skeleton/Skeleton';
import { HStack } from '../../ui/redesigned/Stack/HStack/HStack';
import { VStack } from '../../ui/redesigned/Stack/VStack/VStack';
import { MainLayout } from '../MainLayout';

export const AppLoaderLayout = memo(() => (
    <MainLayout
        header={
            <HStack className={cls.header}>
                <Skeleton width={40} height={40} border="50%" />
            </HStack>
        }
        content={
            <VStack gap="16" style={{ height: '100%' }}>
                <Skeleton width="70%" height={32} border="16px" />
                <Skeleton width="40%" height={20} border="16px" />
                <Skeleton width="50%" height={20} border="16px" />
                <Skeleton width="30%" height={32} border="16px" />
                <Skeleton width="80%" height="40%" border="16px" />
                <Skeleton width="80%" height="40%" border="16px" />
            </VStack>
        }
        sidebar={<Skeleton border="32px" width={220} height="100%" />}
    />
));
