import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import ProfileForm from '../../pages/profile/profile-form';
import OrderHistory from '../../pages/profile/order-history';
import IngredientsDetails from '../../pages/ingredients-details';
import NotFound from '../../pages/not-found';
import Modal from '../modal/modal';

const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		navigate(-1);
	};
	return (
		<>
			<div className={styles.app}>
				<AppHeader />
				<Routes location={background || location}>
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
