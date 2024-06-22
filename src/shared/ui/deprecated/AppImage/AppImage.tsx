/* eslint-disable react/jsx-max-props-per-line */
import { memo, useLayoutEffect, useState } from 'react';

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: React.ReactElement;
    errorFallback?: React.ReactElement;
}
/**
 * Deprecated, use new components from redesigned
 * @deprecated
 */
export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        fallback,
        errorFallback,
        ...otherProps
    } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => setIsLoading(false);
        img.onerror = () => {
            setHasError(true);
            setIsLoading(false);
        };
    }, [src]);

    if (isLoading && fallback) return fallback;
    if (hasError && errorFallback) return errorFallback;

    return <img src={src} alt={alt} className={className} {...otherProps} />;
});
