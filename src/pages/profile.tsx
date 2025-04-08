import styles from './profile.module.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../services/hooks';
import { logoutUser } from '../services/auth/actions';

const Profile = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		`text text_type_main-medium ${
			isActive ? styles.link_active : 'text_color_inactive'
		} ${styles.link}`;

	const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		await dispatch(logoutUser());
		navigate('/login');
	};

	return (
		<div className={styles.container}>
			<nav className={styles.nav}>
				<NavLink to='/profile' end className={getNavLinkClass}>
					Профиль
				</NavLink>
				<NavLink to='/profile/orders' className={getNavLinkClass}>
					История заказов
				</NavLink>
				<NavLink
					to='/login'
					onClick={handleLogout}
					className={`text text_type_main-medium text_color_inactive ${styles.link}`}>
					Выход
				</NavLink>
				<p
					className={`text text_type_main-default text_color_inactive mt-20 ${styles.description}`}>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</nav>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
};

export default Profile;
