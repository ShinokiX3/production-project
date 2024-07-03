/* eslint-disable react/jsx-max-props-per-line */
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card } from '@/shared/ui/redesigned/Card';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import {
    Button as ButtonDeprecated,
    SizeButton,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    rate?: number;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        rate = 0,
        onAccept,
        onCancel,
    } = props;
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);

            if (hasFeedback) setIsModalOpen(true);
            else onAccept?.(selectedStarsCount);
        },
        [hasFeedback, onAccept],
    );

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [onAccept, starsCount, feedback]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <>
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Your grade')}
                        data-testid="RatingCard.Input"
                    />
                </>
            }
            on={
                <>
                    <Text title={feedbackTitle} />
                    <Input
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Your grade')}
                        data-testid="RatingCard.Input"
                    />
                </>
            }
        />
    );

    const content = (
        <VStack align="center" gap="8">
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <TextDeprecated
                        className={cls.title}
                        size={TextSize.L}
                        title={
                            starsCount
                                ? t('Thank you for your feedback')
                                : title
                        }
                    />
                }
                on={
                    <Text
                        className={cls.title}
                        size="l"
                        title={
                            starsCount
                                ? t('Thank you for your feedback')
                                : title
                        }
                    />
                }
            />
            <StarRating
                selectedStars={starsCount}
                onSelect={onSelectStars}
                size={40}
            />
            <BrowserView>
                <Modal isOpen={isModalOpen} onClose={cancelHandle} lazy>
                    <VStack max gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <HStack max gap="16" justify="end">
                                    <Button
                                        data-testid="RatingCard.Close"
                                        onClick={cancelHandle}
                                        variant="outline"
                                    >
                                        {t('Close')}
                                    </Button>
                                    <Button
                                        data-testid="RatingCard.Save"
                                        onClick={acceptHandle}
                                    >
                                        {t('Save')}
                                    </Button>
                                </HStack>
                            }
                            off={
                                <HStack max gap="16" justify="end">
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Close"
                                        onClick={cancelHandle}
                                        theme={ThemeButton.OUTLINE_RED}
                                    >
                                        {t('Close')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Save"
                                        onClick={acceptHandle}
                                    >
                                        {t('Save')}
                                    </ButtonDeprecated>
                                </HStack>
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} onClose={cancelHandle} lazy>
                    <VStack gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            off={
                                <ButtonDeprecated
                                    full
                                    onClick={acceptHandle}
                                    size={SizeButton.L}
                                >
                                    {t('Save')}
                                </ButtonDeprecated>
                            }
                            on={
                                <Button full onClick={acceptHandle} size="l">
                                    {t('Save')}
                                </Button>
                            }
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </VStack>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card full border="round" padding="24" data-testid="RatingCard">
                    {content}
                </Card>
            }
            off={
                <CardDeprecated
                    full
                    className={classNames(cls.RatingCard, {}, [className])}
                    data-testid="RatingCard"
                >
                    {content}
                </CardDeprecated>
            }
        />
    );
});
