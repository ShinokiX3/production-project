import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/Modal';
import { saveJSONSettings, useJSONSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/Text';
import { Drawer } from '@/shared/ui/Drawer';

export const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    
    const dispatch = useAppDispatch();

    const { isArticlePageWasOpened } = useJSONSettings();

    useEffect(() => {
        if (!isArticlePageWasOpened) {
            setIsOpen(true);
            dispatch(saveJSONSettings({ isArticlePageWasOpened: true }));
        }
    }, [isArticlePageWasOpened, dispatch]);

    const onClose = () => setIsOpen(false);

    const text = (
        <Text
            title={t('Welcome')} 
            text={t('Hello there')} 
        />
    )

    if (isMobile) return (
        <Drawer 
            isOpen={isOpen} 
            onClose={onClose}>
            { text }
        </Drawer>
    )
    
    return (
        <Modal 
            lazy 
            isOpen={isOpen} 
            onClose={onClose}
        >
            { text }
        </Modal>
    );
});