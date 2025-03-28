import styles from './profile.module.css';
import { NavLink, Outlet } from 'react-router-dom';

const Profile = () => {
	const getNavLinkClass = ({ isActive }) =>
		`text text_type_main-medium ${
			isActive ? styles.link_active : 'text_color_inactive'
		} ${styles.link}`;

	return (
		<div className={styles.container}>
			<nav className={styles.nav}>
				<NavLink to='/profile' end className={getNavLinkClass}>
					Профиль
				</NavLink>
				<NavLink to='/profile/orders' className={getNavLinkClass}>
					История заказов
				</NavLink>
				<NavLink to='/login' className={getNavLinkClass}>
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
