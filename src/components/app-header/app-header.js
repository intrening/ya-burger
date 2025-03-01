import React from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.container}>
				<ul className={styles.menu}>
					<li className={`${styles.menuItem} p-2 mr-2`}>
						<a className={styles.link} href='/'>
							<BurgerIcon type='primary' />
							<span className='text text_type_main-default ml-2'>
								Конструктор
							</span>
						</a>
					</li>
					<li className={`${styles.menuItem} p-2`}>
						<a className={styles.link} href='/feed'>
							<ListIcon type='secondary' />
							<span className='text text_type_main-default text_color_inactive ml-2'>
								Лента заказов
							</span>
						</a>
					</li>
				</ul>

				<a className={styles.logo} href='/'>
					<Logo />
				</a>

				<a className={styles.link} href='/profile'>
					<ProfileIcon type='secondary' />
					<span className='text text_type_main-default text_color_inactive ml-2'>
						Личный кабинет
					</span>
				</a>
			</nav>
		</header>
	);
};

export default AppHeader;
