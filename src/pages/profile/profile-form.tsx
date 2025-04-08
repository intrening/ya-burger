import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.css';
import { useState, useEffect, useCallback } from 'react';
import { updateUser } from '../../services/auth/actions';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

const ProfileForm: React.FC = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [isEdited, setIsEdited] = useState(false);
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const authError = useAppSelector((state) => state.auth.authError);
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		setForm({ ...form, [field]: e.target.value });
		setIsEdited(true);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateUser(form));
	};

	const setDefaultForm = useCallback(() => {
		setForm({
			name: user?.name || '',
			email: user?.email || '',
			password: '',
		});
	}, [user]);

	const handleCancel = () => {
		setIsEdited(false);
		setDefaultForm();
	};

	useEffect(() => {
		setDefaultForm();
	}, [user, setDefaultForm]);

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input
				type='text'
				placeholder='Имя'
				icon='EditIcon'
				value={form.name}
				onChange={(e) => handleChange(e, 'name')}
			/>
			<EmailInput
				placeholder='E-mail'
				value={form.email}
				onChange={(e) => handleChange(e, 'email')}
			/>
			<PasswordInput
				placeholder='Пароль'
				icon='EditIcon'
				value={form.password}
				onChange={(e) => handleChange(e, 'password')}
			/>
			{isEdited && (
				<div className={styles.buttons}>
					<Button
						htmlType='button'
						type='secondary'
						size='medium'
						onClick={handleCancel}>
						Отмена
					</Button>
					<Button htmlType='submit' type='primary' size='medium'>
						Сохранить
					</Button>
				</div>
			)}
			{authError && (
				<p className='text text_type_main-default text_color_error mb-4'>
					{authError}
				</p>
			)}
		</form>
	);
};

export default ProfileForm;
