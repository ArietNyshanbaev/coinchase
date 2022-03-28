import PropTypes from 'prop-types';

export const navigationType = PropTypes.shape({
	dispatch: PropTypes.func.isRequired,
	goBack: PropTypes.func.isRequired,
	navigate: PropTypes.func.isRequired,
	setParams: PropTypes.func.isRequired,
}).isRequired;
