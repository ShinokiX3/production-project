import { useContext } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './styles/index.scss';
import { Suspense, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { AppRouter } from './providers/router';

const App = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className={classNames('app', {}, [theme])}>
			<button onClick={toggleTheme}>Toggle theme</button>
			<Link to={'/'}>Main</Link>
			<Link to={'/about'}>About</Link>
			<AppRouter />
		</div>
	);
};

export default App;
