import {
	PasswordInput,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/auth/auth-form';
import styles from '../../components/auth/auth-form.module.css';
import { useState } from 'react';

const ResetPassword = () => {
	const [form, setForm] = useState({ password: '', token: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const extraContent = (
		<p className='text text_type_main-default text_color_inactive'>
			Вспомнили пароль?{' '}
			<Link to='/login' className={styles.link}>
				Войти
			</Link>
		</p>
	);

	return (
		<AuthForm
			title='Восстановление пароля'
			buttonText='Сохранить'
			onSubmit={handleSubmit}
			extraContent={extraContent}>
			<PasswordInput
				placeholder='Введите новый пароль'
				value={form.password}
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>
			<Input
				type='text'
				placeholder='Введите код из письма'
				value={form.token}
				onChange={(e) => setForm({ ...form, token: e.target.value })}
			/>
		</AuthForm>
	);
};

export default ResetPassword;
