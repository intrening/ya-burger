import React from 'react';
import PropTypes from 'prop-types';
import styles from './app.module.scss';
import AppHeader from '../app-header/app-header';

const App = ({ ingredients }) => {
	return (
		<div className={styles.app}>
			<AppHeader ingredients={ingredients} />
		</div>
	);
};

App.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
