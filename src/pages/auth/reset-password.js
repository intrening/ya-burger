import {
	PasswordInput,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/auth-form';
import styles from '../../components/auth/auth-form.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/auth/actions';

const ResetPassword = () => {
	const [form, setForm] = useState({ password: '', token: '' });
	const dispatch = useDispatch();
	const authError = useSelector((state) => state.auth.authError);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(resetPassword(form));
		navigate('/login');
	};

	const extraContent = (
		<>
			{authError && (
				<p className='text text_type_main-default text_color_error mb-4'>
					{authError}
				</p>
			)}
			<p className='text text_type_main-default text_color_inactive'>
				Вспомнили пароль?{' '}
				<Link to='/login' className={styles.link}>
					Войти
				</Link>
			</p>
		</>
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
