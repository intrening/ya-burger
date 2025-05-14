import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink } from 'react-router-dom';

const AppHeader: React.FC = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.container}>
				<ul className={styles.menu}>
					<li className={`${styles.menuItem} p-2 mr-2`}>
						<NavLink to='/' className={styles.link}>
							{({ isActive }) => (
								<>
									<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
									<span
										className={`text text_type_main-default ml-2 ${
											!isActive && 'text_color_inactive'
										}`}>
										Конструктор
									</span>
								</>
							)}
						</NavLink>
					</li>
					<li className={`${styles.menuItem} p-2`}>
						<NavLink to='/feed' className={styles.link}>
							{({ isActive }) => (
								<>
									<ListIcon type={isActive ? 'primary' : 'secondary'} />
									<span
										className={`text text_type_main-default ml-2 ${
											!isActive && 'text_color_inactive'
										}`}>
										Лента заказов
									</span>
								</>
							)}
						</NavLink>
					</li>
				</ul>

				<NavLink to='/' className={styles.logo}>
					<Logo />
				</NavLink>

				<NavLink to='/profile' className={styles.link}>
					{({ isActive }) => (
						<>
							<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
							<span
								className={`text text_type_main-default ml-2 ${
									!isActive && 'text_color_inactive'
								}`}>
								Личный кабинет
							</span>
						</>
					)}
				</NavLink>
			</nav>
		</header>
	);
};

export default AppHeader;
