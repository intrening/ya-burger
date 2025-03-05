import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';

const BurgerConstructorItem = ({ item }) => {
	return (
		<div className={`${styles.mainElement}`}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image}
			/>
		</div>
	);
};

BurgerConstructorItem.propTypes = {
	item: ingredientPropType.isRequired,
};

export default BurgerConstructorItem;
