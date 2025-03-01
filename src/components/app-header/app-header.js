import React from 'react';
import PropTypes from 'prop-types';
const AppHeader = () => {
	return <div>AppHeader</div>;
};

AppHeader.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AppHeader;
