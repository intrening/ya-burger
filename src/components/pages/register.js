import {
	EmailInput,
	PasswordInput,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import AuthForm from '../auth/auth-form';
import styles from '../auth/auth-form.module.css';
import { useState } from 'react';

const Register = () => {
	const [form, setForm] = useState({ name: '', email: '', password: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const extraContent = (
		<p className='text text_type_main-default text_color_inactive'>
			Уже зарегистрированы?{' '}
			<Link to='/login' className={styles.link}>
				Войти
			</Link>
		</p>
	);

	return (
		<AuthForm
			title='Регистрация'
			buttonText='Зарегистрироваться'
			onSubmit={handleSubmit}
			extraContent={extraContent}>
			<Input
				type='text'
				placeholder='Имя'
				value={form.name}
				onChange={(e) => setForm({ ...form, name: e.target.value })}
			/>
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

export default Register;
