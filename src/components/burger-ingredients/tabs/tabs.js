import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';

const Tabs = () => {
	return (
		<div className={styles.tabs}>
			<Tab value='bun' active={true}>
				Булки
			</Tab>
			<Tab value='sauce' active={false}>
				Соусы
			</Tab>
			<Tab value='main' active={false}>
				Начинки
			</Tab>
		</div>
	);
};

export default Tabs;
