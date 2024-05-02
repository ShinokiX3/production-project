import { useContext } from 'react';
import {
	LOCAL_STORAGE_THEME_KEY,
	Theme,
	ThemeContext,
} from 'app/providers/ThemeProvider/lib/ThemeContext';

interface IUseThemeResult {
	toggleTheme: () => void;
	theme: Theme;
}

export function useTheme(): IUseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = () => {
		let newTheme: Theme;
		switch (theme) {
		case Theme.DARK:
			newTheme = Theme.LIGHT;
			break;
		case Theme.LIGHT:
			newTheme = Theme.ORANGE;
			break;
		case Theme.ORANGE:
			newTheme = Theme.DARK;
			break;
		default:
			newTheme = Theme.LIGHT;
		}
		setTheme?.(newTheme);
		document.body.className = newTheme;
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	};

	return {
		theme: theme || Theme.LIGHT,
		toggleTheme
	};
}
