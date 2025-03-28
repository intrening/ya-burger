import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth-form.module.css';

const AuthForm = ({ title, children, buttonText, onSubmit, extraContent }) => {
	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={onSubmit}>
				<h2 className='text text_type_main-medium mb-6'>{title}</h2>
				<div className={styles.inputs}>{children}</div>
				<Button htmlType='submit' type='primary' size='medium'>
					{buttonText}
				</Button>
			</form>
			{extraContent && <div className={styles.extra}>{extraContent}</div>}
		</div>
	);
};

export default AuthForm;
