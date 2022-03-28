import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ScreenContainer = styled.SafeAreaView`
	flex: 1;
	background: #e5e5e5;
`;

const ScreenWrapper = ({children, style}) => (
	<ScreenContainer style={style}>{children}</ScreenContainer>
);

ScreenWrapper.propTypes = {
	children: PropTypes.element.isRequired,
	style: PropTypes.array,
};

export default ScreenWrapper;
