import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';

const App = () => {
	return (
		<BrowserRouter>
			<div className={styles.app}>
				<AppHeader />
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
