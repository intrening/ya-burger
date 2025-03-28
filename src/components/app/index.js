import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import ProfileForm from '../../pages/profile/profile-form';
import OrderHistory from '../../pages/profile/order-history';
import NotFound from '../../pages/not-found';

const App = () => {
	return (
		<BrowserRouter>
			<div className={styles.app}>
				<AppHeader />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/reset-password' element={<ResetPassword />} />
					<Route path='/profile' element={<Profile />}>
						<Route index element={<ProfileForm />} />
						<Route path='orders' element={<OrderHistory />} />
						<Route path='orders/:number' element={<div>Order Details</div>} />
					</Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
