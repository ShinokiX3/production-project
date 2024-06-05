import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card/Card';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, SizeButton, ThemeButton } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingCardProps {
    className?: string;
	title?: string;
	feedbackTitle?: string;
	hasFeedback?: boolean;
	onCancel?: (starsCount: number) => void;
	onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: RatingCardProps) => {
	const {
		className,
		title,
		feedbackTitle,
		hasFeedback,
		onAccept,
		onCancel
	} = props;
	const { t } = useTranslation();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [starsCount, setStarsCount] = useState(0);
	const [feedback, setFeedback] = useState('');

	const onSelectStars = useCallback((selectedStarsCount: number) => {
		setStarsCount(selectedStarsCount);

		if (hasFeedback) setIsModalOpen(true);
		else onAccept?.(selectedStarsCount);
	}, [hasFeedback, onAccept]);

	const acceptHandle = useCallback(() => {
		setIsModalOpen(false);
		onAccept?.(starsCount, feedback);
	}, [onAccept, starsCount, feedback]);

	const cancelHandle = useCallback(() => {
		setIsModalOpen(false);
		onCancel?.(starsCount);
	}, [onCancel, starsCount]);

	const modalContent = (
		<>
			<Text
				title={feedbackTitle}
			/>
			<Input
				value={feedback}
				onChange={setFeedback}
				placeholder={t('Your grade')}
			/>
		</>
	);

	return (
		<Card className={classNames(cls.RatingCard, {}, [className])}>
			<VStack align="center" gap="8">
				<Text
					className={cls.title}
					size={TextSize.L}
					title={title}
				/>
				<StarRating
					size={40}
					onSelect={onSelectStars}
				/>
				<BrowserView>
					<Modal isOpen={isModalOpen} onClose={cancelHandle} lazy>
						<VStack max gap="32">
							{modalContent}
							<HStack max gap="16" justify="end">
								<Button onClick={cancelHandle} theme={ThemeButton.OUTLINE_RED}>{t('Close')}</Button>
								<Button onClick={acceptHandle}>{t('Save')}</Button>
							</HStack>
						</VStack>
					</Modal>
				</BrowserView>
				<MobileView>
					<Drawer isOpen={isModalOpen} onClose={cancelHandle} lazy>
						<VStack gap="32">
							{modalContent}
							<Button
								full
								onClick={acceptHandle}
								size={SizeButton.L}
							>
								{t('Save')}
							</Button>
						</VStack>
					</Drawer>
				</MobileView>
			</VStack>
		</Card>
	);
});
