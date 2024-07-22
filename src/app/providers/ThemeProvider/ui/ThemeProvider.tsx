import { useState, useMemo, useEffect } from 'react';
import {
    LOCAL_STORAGE_THEME_KEY,
    Theme,
    ThemeContext,
} from '../lib/ThemeContext';
import { useJSONSettings } from '@/entities/User';

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: React.ReactNode;
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme, children } = props;
    const { theme: defaultTheme } = useJSONSettings();
    const [isThemeInited, setIsThemeInited] = useState(false);
    const [theme, setTheme] = useState<Theme>(
        initialTheme || fallbackTheme || Theme.LIGHT,
    );

    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme);
            setIsThemeInited(true);
        }
    }, [defaultTheme, isThemeInited]);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
