import {
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import AuthForm from '../auth/auth-form';
import styles from '../auth/auth-form.module.css';
import { useState } from 'react';

const Login = () => {
	const [form, setForm] = useState({ email: '', password: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Implement login logic
	};

	const extraContent = (
		<>
			<p className='text text_type_main-default text_color_inactive'>
				Вы — новый пользователь?{' '}
				<Link to='/register' className={styles.link}>
					Зарегистрироваться
				</Link>
			</p>
			<p className='text text_type_main-default text_color_inactive'>
				Забыли пароль?{' '}
				<Link to='/forgot-password' className={styles.link}>
					Восстановить пароль
				</Link>
			</p>
		</>
	);

	return (
		<AuthForm
			title='Вход'
			buttonText='Войти'
			onSubmit={handleSubmit}
			extraContent={extraContent}>
			<EmailInput
				value={form.email}
				onChange={(e) => setForm({ ...form, email: e.target.value })}
			/>
			<PasswordInput
				value={form.password}
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>
		</AuthForm>
	);
};

export default Login;
