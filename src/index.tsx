import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import './styles.css';
import { Provider } from 'react-redux';
import { configureStore } from './services/store';
import { BrowserRouter } from 'react-router-dom';

const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);
// @ts-expect-error: Redux
const store = configureStore();

root.render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</StrictMode>
);
