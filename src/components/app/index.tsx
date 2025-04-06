import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from '../../pages/home';
import Login from '../../pages/auth/login';
import Register from '../../pages/auth/register';
import ForgotPassword from '../../pages/auth/forgot-password';
import ResetPassword from '../../pages/auth/reset-password';
import Profile from '../../pages/profile';
import ProfileForm from '../../pages/profile/profile-form';
import OrderHistory from '../../pages/profile/order-history';
import IngredientsDetails from '../../pages/ingredients-details';
import NotFound from '../../pages/not-found';
import Modal from '../modal/modal';
import { checkUserAuth } from '../../services/auth/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import Feed from '../../pages/feed';
import { AppDispatch } from '../../services/store';

const App: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		navigate(-1);
	};

	useEffect(() => {
		dispatch(checkUserAuth());
	}, [dispatch]);

	return (
		<>
			<div className={styles.app}>
				<AppHeader />
				<Routes location={background || location}>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
					<Route
						path='/register'
						element={<OnlyUnAuth component={<Register />} />}
					/>
					<Route
						path='/forgot-password'
						element={<OnlyUnAuth component={<ForgotPassword />} />}
					/>
					<Route
						path='/reset-password'
						element={<OnlyUnAuth component={<ResetPassword />} />}
					/>
					<Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
						<Route index element={<ProfileForm />} />
						<Route path='orders' element={<OrderHistory />} />
						<Route path='orders/:number' element={<div>Order Details</div>} />
					</Route>
					<Route path='/feed' element={<Feed />} />
					<Route
						path='/ingredients/:ingredientId'
						element={<IngredientsDetails />}
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>

				{background && (
					<Routes>
						<Route
							path='/ingredients/:ingredientId'
							element={
								<Modal onClose={handleModalClose}>
									<IngredientsDetails />
								</Modal>
							}
						/>
					</Routes>
				)}
			</div>
		</>
	);
};

export default App;
