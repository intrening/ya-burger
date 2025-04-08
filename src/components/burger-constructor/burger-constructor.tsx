import React from 'react';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import BurgerConstructorItem from './burger-constructor-item';
import OrderSummary from './order-summary';
import { useModal } from '../hooks/useModal';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import {
	addIngredient,
	setIngredients,
	resetConstructor,
} from '../../services/burger-constructor/actions';
import { resetOrderState, createOrder } from '../../services/order/actions';

const BurgerConstructor: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isModalOpen, openModal, closeModal } = useModal();
	const { orderNumber } = useAppSelector((state) => state.order);
	const user = useAppSelector((state) => state.auth.user);
	const navigate = useNavigate();

	const handlePlaceOrder = async () => {
		if (!user) {
			navigate('/login');
		}
		openModal();
		await dispatch(createOrder(bun, ingredients));
	};

	const handleModalClose = () => {
		closeModal();
		if (orderNumber) {
			dispatch(resetOrderState());
			dispatch(resetConstructor());
		}
	};

	const [{ isOver }, dropRef] = useDrop({
		accept: 'ingredient',
		drop: (ingredient: TIngredient) => {
			dispatch(addIngredient(ingredient));
		},
		collect: (monitor: DropTargetMonitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const { ingredients, bun } = useAppSelector(
		(state) => state.burgerConstructor
	);

	const moveIngredientCard = (dragIndex: number, hoverIndex: number) => {
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
					{ingredients.map((item: TIngredient, index: number) => (
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
				<OrderSummary onPlaceOrder={handlePlaceOrder} />
			</div>

			{isModalOpen && (
				<Modal onClose={handleModalClose}>
					<OrderDetails />
				</Modal>
			)}
		</section>
	);
};

export default BurgerConstructor;
