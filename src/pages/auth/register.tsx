import {
	EmailInput,
	PasswordInput,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/auth-form';
import styles from '../../components/auth/auth-form.module.css';
import { useState } from 'react';
import { registerUser } from '../../services/auth/actions';
import { useAppSelector, useAppDispatch } from '../../services/hooks';

const Register: React.FC = () => {
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const authError = useAppSelector((state) => state.auth.authError);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await dispatch(registerUser(form));
		if (success) {
			navigate('/login');
		}
	};

	const extraContent = (
		<>
			{authError && (
				<p className='text text_type_main-default text_color_error mb-4'>
					{authError}
				</p>
			)}
			<p className='text text_type_main-default text_color_inactive'>
				Уже зарегистрированы?{' '}
				<Link to='/login' className={styles.link}>
					Войти
				</Link>
			</p>
		</>
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
