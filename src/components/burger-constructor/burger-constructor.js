import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
	ingredientPropType,
	ingredientArrayPropType,
} from '../../utils/prop-types';

const BurgerConstructor = ({ constructorData }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { bun, constructorIngredients } = constructorData;

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
		if (constructorIngredients && constructorIngredients.length) {
			total += constructorIngredients.reduce(
				(sum, item) => sum + (item.price || 0),
				0
			);
		}
		return total;
	};

	return (
		<section className={styles.burgerConstructor}>
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
					{constructorIngredients.map((item) => (
						<BurgerConstructorItem key={item._id} item={item} />
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

BurgerConstructor.propTypes = {
	constructorData: PropTypes.shape({
		bun: ingredientPropType,
		constructorIngredients: ingredientArrayPropType.isRequired,
	}).isRequired,
};

export default BurgerConstructor;

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

const OrderSummary = ({ totalPrice, onPlaceOrder }) => {
	return (
		<div className={`${styles.totalSection} mr-4 mt-10`}>
			<div className={styles.totalPrice}>
				<span className='text text_type_digits-medium'>{totalPrice}</span>
				<CurrencyIcon type='primary' />
			</div>
			<Button
				type='primary'
				size='large'
				onClick={onPlaceOrder}
				htmlType='button'>
				Оформить заказ
			</Button>
		</div>
	);
};

OrderSummary.propTypes = {
	onPlaceOrder: PropTypes.func.isRequired,
	totalPrice: PropTypes.number.isRequired,
};
