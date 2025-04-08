import {
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/auth/auth-form';
import styles from '../../components/auth/auth-form.module.css';
import { useState } from 'react';
import { loginUser } from '../../services/auth/actions';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

const Login: React.FC = () => {
	const [form, setForm] = useState({ email: '', password: '' });
	const authError = useAppSelector((state) => state.auth.authError);
	const dispatch = useAppDispatch();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await dispatch(loginUser(form));
	};

	const extraContent = (
		<>
			{authError && (
				<p className='text text_type_main-default text_color_error mb-4'>
					{authError}
				</p>
			)}
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
