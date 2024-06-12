import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { StarRating } from '@/shared/ui/StarRating';
import { Text, TextSize } from '@/shared/ui/Text';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Button, SizeButton, ThemeButton } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';

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
		onCancel
	} = props;
	const { t } = useTranslation();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [starsCount, setStarsCount] = useState(rate);
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
				data-testid="RatingCard.Input"
			/>
		</>
	);

	return (
		<Card
			full
			className={classNames(cls.RatingCard, {}, [className])}
			data-testid="RatingCard"
		>
			<VStack align="center" gap="8">
				<Text
					className={cls.title}
					size={TextSize.L}
					title={starsCount ? t('Thank you for your feedback') : title}
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
							<HStack max gap="16" justify="end">
								<Button
									data-testid="RatingCard.Close"
									onClick={cancelHandle}
									theme={ThemeButton.OUTLINE_RED}
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
