import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';
import PropTypes from 'prop-types';

const Tabs = ({ activeTab, onTabClick, ingredientCategories }) => {
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

Tabs.propTypes = {
	activeTab: PropTypes.string.isRequired,
	onTabClick: PropTypes.func.isRequired,
	ingredientCategories: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			ingredients: PropTypes.array.isRequired,
			ref: PropTypes.object.isRequired,
		})
	),
};

export default Tabs;
