import { useContext } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './styles/index.scss';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import { Suspense, useState } from 'react';
import { useTheme } from './theme/useTheme';
import { classNams } from './helpers/classNames/classNames';

const App = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className={classNams('app', {}, [theme])}>
			<button onClick={toggleTheme}>Toggle theme</button>
			<Link to={'/'}>Main</Link>
			<Link to={'/about'}>About</Link>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={'about'} element={<AboutPageAsync />} />
					<Route path={'/'} element={<MainPageAsync />} />
				</Routes>
			</Suspense>
			Text
		</div>
	);
};

export default App;
