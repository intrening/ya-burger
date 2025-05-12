import { TIngredient } from '../../types';

const OrderCardIngredients: React.FC<{ ingredients: Array<TIngredient> }> = ({
	ingredients,
}) => (
	<div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
		{ingredients.slice(0, 5).map((ingredient, idx) => (
			<img
				key={ingredient._id}
				src={ingredient.image}
				alt={ingredient.name}
				style={{
					width: 40,
					height: 40,
					borderRadius: '50%',
					border: '2px solid #4C4CFF',
					marginLeft: idx === 0 ? 0 : -12,
					background: '#191922',
				}}
			/>
		))}
		{ingredients.length > 5 && (
			<span style={{ marginLeft: 4, color: '#8585ad', fontSize: 16 }}>
				+{ingredients.length - 5}
			</span>
		)}
	</div>
);

export default OrderCardIngredients;
