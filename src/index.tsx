import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import './styles.css';
import ingredientsData from './utils/data';
const ingredients = ingredientsData;

const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<App ingredients={ingredients} />
	</StrictMode>
);
