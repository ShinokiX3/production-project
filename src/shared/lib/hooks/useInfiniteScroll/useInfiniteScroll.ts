import { useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: React.MutableRefObject<HTMLElement>;
    wrapperRef?: React.MutableRefObject<HTMLElement>;
}

export const useInfiniteScroll = ({
    callback,
    triggerRef,
    wrapperRef,
}: UseInfiniteScrollOptions) => {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const wrapperElement = wrapperRef?.current || null;
        const triggerElement = triggerRef.current;

        if (callback) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.current.observe(triggerElement);
        }

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (observer.current && triggerElement)
                observer.current.unobserve(triggerElement);
        };
    }, [callback, wrapperRef, triggerRef]);
};
