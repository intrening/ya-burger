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
import { useEffect } from 'react';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import Feed from '../../pages/feed';
import { useAppDispatch } from '../../services/hooks';
import OrderDetailsPage from '../../pages/order-details';
import { fetchIngredients } from '../../services/burger-ingredients/actions';

const App: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		navigate(-1);
	};

	useEffect(() => {
		dispatch(checkUserAuth());
		dispatch(fetchIngredients());
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
					</Route>
					<Route
						path='/profile/orders/:number'
						element={<OnlyAuth component={<OrderDetailsPage />} />}
					/>
					<Route path='/feed' element={<Feed />} />
					<Route path='/feed/:number' element={<OrderDetailsPage />} />
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
						<Route
							path='/feed/:number'
							element={
								<Modal onClose={handleModalClose}>
									<OrderDetailsPage />
								</Modal>
							}
						/>
						<Route
							path='/profile/orders/:number'
							element={
								<Modal onClose={handleModalClose}>
									<OrderDetailsPage />
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
