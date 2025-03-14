import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import BurgerConstructorItem from './burger-constructor-item';
import OrderSummary from './order-summary';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
	addIngredient,
	setIngredients,
} from '../../services/burger-constructor/actions';

const BurgerConstructor = () => {
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [{ isOver }, dropRef] = useDrop({
		accept: 'ingredient',
		drop: (ingredient) => {
			console.log(ingredient);
			dispatch(addIngredient(ingredient));
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const { ingredients, bun } = useSelector((state) => state.burgerConstructor);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const calculateTotalPrice = () => {
		let total = 0;

		if (bun && typeof bun.price === 'number') {
			total += bun.price * 2;
		}
		if (ingredients && ingredients.length) {
			total += ingredients.reduce((sum, item) => sum + (item.price || 0), 0);
		}
		return total;
	};

	const moveIngredientCard = (dragIndex, hoverIndex) => {
		const dragItem = ingredients[dragIndex];
		const newIngredients = [...ingredients];
		newIngredients.splice(dragIndex, 1);
		newIngredients.splice(hoverIndex, 0, dragItem);
		dispatch(setIngredients(newIngredients));
	};

	const borderColor = isOver ? '#4C4CFF' : 'rgba(0, 0, 0, 0.2)';

	return (
		<section
			className={styles.burgerConstructor}
			style={{ border: `1px solid ${borderColor}` }}
			ref={dropRef}>
			<div className={`${styles.selectedIngredients} pt-25 pl-4 pr-4`}>
				<div className={`${styles.bunElement} mb-4`}>
					<div className={styles.fakeDrag}>
						<DragIcon type='primary' />
					</div>
					{bun ? (
						<ConstructorElement
							type='top'
							isLocked={true}
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					) : (
						<ConstructorElement
							type='top'
							isLocked={true}
							text='Добавьте булку'
							price={0}
							thumbnail=''
						/>
					)}
				</div>
				<div className={`${styles.mainElements} custom-scroll`}>
					{ingredients.map((item, index) => (
						<BurgerConstructorItem
							key={item.uuid}
							item={item}
							index={index}
							moveIngredientCard={moveIngredientCard}
						/>
					))}
				</div>
				<div className={`${styles.bunElement} mt-4`}>
					<div className={styles.fakeDrag}>
						<DragIcon type='primary' />
					</div>
					{bun ? (
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					) : (
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text='Добавьте булку'
							price={0}
							thumbnail=''
						/>
					)}
				</div>
				<OrderSummary
					onPlaceOrder={openModal}
					totalPrice={calculateTotalPrice()}
				/>
			</div>

			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</section>
	);
};

export default BurgerConstructor;
