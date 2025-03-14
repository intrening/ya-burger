import styles from './burger-ingredients.module.css';
import Tabs from './tabs/tabs';
import IngredientCategory from './ingredient-categories/ingredient-categories';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchIngredients,
	resetIngredientsState,
} from '../../services/burger-ingredients/actions';
import {
	getBunIngredients,
	getSauceIngredients,
	getMainIngredients,
} from '../../services/burger-ingredients/selectors';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = () => {
	const bunIngredients = useSelector(getBunIngredients);
	const sauceIngredients = useSelector(getSauceIngredients);
	const mainIngredients = useSelector(getMainIngredients);

	const { isLoading, error } = useSelector((state) => state.burgerIngredients);
	const [activeTab, setActiveTab] = useState('bun');
	const containerRef = useRef(null);
	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	const ingredientCategories = [
		{
			id: 'bun',
			title: 'Булки',
			ingredients: bunIngredients,
			ref: bunRef,
		},
		{
			id: 'sauce',
			title: 'Соусы',
			ingredients: sauceIngredients,
			ref: sauceRef,
		},
		{
			id: 'main',
			title: 'Начинки',
			ingredients: mainIngredients,
			ref: mainRef,
		},
	];

	const handleScroll = useCallback(() => {
		if (
			!containerRef.current ||
			!bunRef.current ||
			!sauceRef.current ||
			!mainRef.current
		) {
			return;
		}

		const containerRect = containerRef.current.getBoundingClientRect();
		const bunDistance = Math.abs(
			bunRef.current.getBoundingClientRect().top - containerRect.top
		);
		const sauceDistance = Math.abs(
			sauceRef.current.getBoundingClientRect().top - containerRect.top
		);
		const mainDistance = Math.abs(
			mainRef.current.getBoundingClientRect().top - containerRect.top
		);

		let newActiveTab;

		if (bunDistance <= sauceDistance && bunDistance <= mainDistance) {
			newActiveTab = 'bun';
		} else if (sauceDistance <= bunDistance && sauceDistance <= mainDistance) {
			newActiveTab = 'sauce';
		} else {
			newActiveTab = 'main';
		}

		setActiveTab(newActiveTab);
	}, []);

	const handleTabClick = useCallback((ref) => {
		if (ref && ref.current) {
			setActiveTab(ref.current.id);
			ref.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, []);

	const handleRetry = () => {
		dispatch(resetIngredientsState());
		dispatch(fetchIngredients());
	};

	if (isLoading) {
		return (
			<section className={styles.burgerIngredients}>
				<p className='text text_type_main-large'>Загрузка ингредиентов...</p>
				<div className={styles.loaderContainer}>
					<div className={styles.loader}></div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className={styles.burgerIngredients}>
				<p className='text text_type_main-large mb-5'>
					Не удалось загрузить ингредиенты
				</p>
				<p className='text text_type_main-default mb-10'>{error}</p>
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					onClick={handleRetry}>
					Попробовать снова
				</Button>
			</section>
		);
	}

	return (
		<section className={styles.burgerIngredients}>
			<p className='text text_type_main-large'>Соберите бургер</p>
			<Tabs
				activeTab={activeTab}
				onTabClick={(ref) => handleTabClick(ref)}
				ingredientCategories={ingredientCategories}
			/>
			<div
				className={`${styles.ingredients} custom-scroll pl-4 pr-4`}
				ref={containerRef}
				onScroll={handleScroll}>
				{ingredientCategories.map((category) => (
					<IngredientCategory
						key={category.id}
						id={category.id}
						title={category.title}
						ingredients={category.ingredients}
						ref={category.ref}
					/>
				))}
			</div>
		</section>
	);
};

export default BurgerIngredients;
