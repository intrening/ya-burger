import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.css';
import { useState } from 'react';

const ProfileForm = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [isEdited, setIsEdited] = useState(false);

	const handleChange = (e, field) => {
		setForm({ ...form, [field]: e.target.value });
		setIsEdited(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleCancel = () => {
		setIsEdited(false);
	};

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
				placeholder='Логин'
				icon='EditIcon'
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
		</form>
	);
};

export default ProfileForm;
