import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../../components/auth/auth-form';
import styles from '../../components/auth/auth-form.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword } from '../../services/auth/actions';
import { TStore } from '@services/types';
import { AppDispatch } from '../../services/store';

const ForgotPassword: React.FC = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const authError = useSelector((state: TStore) => state.auth.authError);
	const dispatch = useDispatch<AppDispatch>();

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
