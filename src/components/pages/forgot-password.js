import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import AuthForm from '../auth/auth-form';
import styles from '../auth/auth-form.module.css';
import { useState } from 'react';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');

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
			buttonText='Восстановить'
			onSubmit={handleSubmit}
			extraContent={extraContent}>
			<EmailInput
				placeholder='Укажите e-mail'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
		</AuthForm>
	);
};

export default ForgotPassword;
