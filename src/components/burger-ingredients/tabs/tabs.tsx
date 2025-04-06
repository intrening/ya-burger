import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';
import { TIngredientCategory } from '../../../utils/types';

const Tabs: React.FC<{
	activeTab: string;
	onTabClick: (ref: React.RefObject<HTMLDivElement>) => void;
	ingredientCategories: Array<TIngredientCategory>;
}> = ({ activeTab, onTabClick, ingredientCategories }) => {
	return (
		<div className={styles.tabs}>
			{ingredientCategories.map((category) => (
				<Tab
					key={category.id}
					value={category.id}
					active={activeTab === category.id}
					onClick={() => onTabClick(category.ref)}>
					{category.title}
				</Tab>
			))}
		</div>
	);
};

export default Tabs;
