import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerConstructor = ({ bun, items }) => {
	return (
		<section className={styles.burgerConstructor}>
			<div className={`${styles.selectedIngredients} pt-25 pl-4 pr-4`}>
				<div className={`${styles.bunElement} mb-4 ml-8`}>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
				<div className={`${styles.mainElements} custom-scroll`}>
					{items.map((item) => (
						<BurgerConstructorItem key={item.positionInCart} item={item} />
					))}
				</div>
				<div className={`${styles.bunElement} mt-4 ml-8`}>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
				<OrderSummary bun={bun} items={items} />
			</div>
		</section>
	);
};

export default BurgerConstructor;

const BurgerConstructorItem = ({ item }) => {
	return (
		<div className={`${styles.mainElement} mb-4`}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image}
			/>
		</div>
	);
};

const OrderSummary = ({ bun, items }) => {
	const calculateTotalPrice = () => {
		let total = 0;

		if (bun) {
			total += bun.price * 2;
		}
		if (items && items.length) {
			total += items.reduce((sum, item) => sum + item.price, 0);
		}
		return total;
	};

	const totalPrice = calculateTotalPrice();

	return (
		<div className={`${styles.totalSection} mr-4 mt-10`}>
			<div className={styles.totalPrice}>
				<span className='text text_type_digits-medium'>{totalPrice}</span>
				<CurrencyIcon type='primary' />
			</div>
			<Button type='primary' size='large' disabled={true}>
				Оформить заказ
			</Button>
		</div>
	);
};

OrderSummary.propTypes = {
	bun: PropTypes.shape({
		price: PropTypes.number.isRequired,
	}),
	items: PropTypes.arrayOf(
		PropTypes.shape({
			price: PropTypes.number.isRequired,
		})
	).isRequired,
};
