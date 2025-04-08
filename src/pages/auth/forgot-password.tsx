import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../../components/auth/auth-form';
import styles from '../../components/auth/auth-form.module.css';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { forgotPassword } from '../../services/auth/actions';

const ForgotPassword: React.FC = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const authError = useAppSelector((state) => state.auth.authError);
	const dispatch = useAppDispatch();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await dispatch(forgotPassword(email));
		navigate('/reset-password', { state: { from: location } });
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
