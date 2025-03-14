import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

const BurgerConstructorItem = ({ item, index, moveIngredientCard }) => {
	const ref = useRef(null);
	const [{ isDragging }, dragRef] = useDrag({
		type: 'constructor-ingredient',
		item: () => {
			return { index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const [, dropTarget] = useDrop({
		accept: 'constructor-ingredient',
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === undefined || dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			moveIngredientCard(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});
	dragRef(dropTarget(ref));
	const opacity = isDragging ? 0 : 1;

	return (
		<div className={`${styles.mainElement}`} ref={ref} style={{ opacity }}>
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
