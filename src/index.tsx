import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import './styles.css';
import { Provider } from 'react-redux';
import { configureStore } from './services/store';

const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);
const store = configureStore();

root.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
