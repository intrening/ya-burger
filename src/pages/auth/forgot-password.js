import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/auth/auth-form';
import styles from '../../components/auth/auth-form.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../services/auth/actions';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	const authError = useSelector((state) => state.auth.authError);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(forgotPassword(email));
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
			{authError && (
				<p className='text text_type_main-default text_color_error mb-4'>
					{authError}
				</p>
			)}
		</AuthForm>
	);
};

export default ForgotPassword;
