import { useEffect } from 'react';

const useInitialEffect = (callback: () => void) => {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            callback();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useInitialEffect;
