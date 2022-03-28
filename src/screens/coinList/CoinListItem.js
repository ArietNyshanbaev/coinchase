import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {isIOS} from '@helpers/platform';

const Cointainer = styled.View`
	padding: 16px;
	background: #fff;
	margin-vertical: 4px;
	border-radius: 8px;
	flex-direction: row;
`;

const Name = styled.Text`
	font-weight: 400;
	font-size: 12px;
	line-height: 15px;
	color: #6c757d;
`;

const Symbol = styled.Text`
	font-weight: 400;
	font-size: 16px;
	line-height: 20px;
	color: #212529;
`;

const CoinLogo = styled.Image`
	height: 40px;
	width: 40px;
`;

const NameSymbol = styled.View`
	margin-left: 16px;
	justify-content: space-between;
`;

const LastDayHighLowPriceContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: space-between;
`;

const HightPrice = styled.Text`
	font-weight: 500;
	font-size: 13px;
	line-height: 15px;
	color: #21bf73;
`;

const LowPrice = styled(HightPrice)`
	color: #d90429;
`;

const PriceAndChangeContainer = styled.View`
	align-items: flex-end;
	justify-content: space-between;
`;

const Price = styled.Text`
	font-weight: 400;
	font-size: 16px;
	line-height: 20px;
	color: #343a40;
`;

const PriceChange = styled.Text`
	font-weight: 500;
	font-size: 10px;
	line-height: 13px;

	color: ${props => (props.negative ? '#d90429' : '#21bf73')};
`;

const TouchableFeedback = isIOS() ? TouchableOpacity : TouchableNativeFeedback;

const CoinListItem = ({
	onDetailShow,
	image,
	name,
	symbol,
	id,
	currentPrice,
	lastDayHigh,
	lastDayLow,
	lastDayPriceChange,
}) => {
	function normalizeNumber(num) {
		return num.toFixed(3).slice(0, 7);
	}

	function handlePress() {
		onDetailShow({coinId: id, name});
	}

	return (
		<TouchableFeedback activeOpacity={0.5} onPress={handlePress}>
			<Cointainer>
				<CoinLogo
					source={{
						uri: image,
					}}
					resizeMode="contain"
				/>
				<NameSymbol>
					<Symbol>{symbol.toUpperCase()}</Symbol>
					<Name>{name}</Name>
				</NameSymbol>
				<LastDayHighLowPriceContainer>
					<HightPrice>↑ €{normalizeNumber(lastDayHigh)}</HightPrice>
					<LowPrice>↓ €{normalizeNumber(lastDayLow)}</LowPrice>
				</LastDayHighLowPriceContainer>
				<PriceAndChangeContainer>
					<Price>€{normalizeNumber(currentPrice)}</Price>
					<PriceChange negative={lastDayPriceChange < 0}>
						{lastDayPriceChange.toFixed(2)}%
					</PriceChange>
				</PriceAndChangeContainer>
			</Cointainer>
		</TouchableFeedback>
	);
};

CoinListItem.propTypes = {
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	symbol: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	currentPrice: PropTypes.number.isRequired,
	lastDayHigh: PropTypes.number.isRequired,
	lastDayLow: PropTypes.number.isRequired,
};

export default CoinListItem;
