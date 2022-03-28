import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {RefreshControl} from 'react-native';
import ScreenWrapper from '@components/ScreenWrapper';
import SCREEN_NAMES from '@constants/screenNames';
import {navigationType} from '@constants/propTypes';
import {fetchCoinList as fetchCoinListApi} from '@api';
import CoinListItem from './CoinListItem';

const Container = styled.View``;

const Title = styled.Text`
	font-style: normal;
	font-weight: 700;
	font-size: 20px;
	line-height: 20px;
	color: #212529;
	padding: 20px 16px;
`;

const StyledFlatList = styled.FlatList`
	padding-horizontal: 16px;
`;
const FooterPlaceholder = styled.View`
	height: 100px;
`;

const PAGING_SIZE = 20;

const CoinList = ({navigation}) => {
	const [isFetchInProgress, setIsFetchInProgress] = useState(false);
	const [coinList, setCoinList] = useState(null);

	useEffect(() => {
		fetchCoinList();
	}, []);

	function handleShowCoinDetail({coinId, name}) {
		navigation.navigate(SCREEN_NAMES.COIN_DETAIL.name, {coinId, name});
	}

	async function fetchCoinList() {
		setIsFetchInProgress(true);
		const coins = await fetchCoinListApi({paginSize: PAGING_SIZE});
		const coinsWithDetail = coins.map(coin => ({
			image: coin.image,
			name: coin.name,
			symbol: coin.symbol,
			id: coin.id,
			currentPrice: coin.current_price,
			lastDayHigh: coin.high_24h,
			lastDayLow: coin.low_24h,
			lastDayPriceChange: coin.price_change_percentage_24h,
		}));

		setCoinList(coinsWithDetail);
		setIsFetchInProgress(false);
	}

	const renderCoinItem = ({item}) => (
		<CoinListItem onDetailShow={handleShowCoinDetail} {...item} />
	);

	return (
		<ScreenWrapper>
			<Container>
				<Title>Top Coins</Title>
				<StyledFlatList
					refreshControl={
						<RefreshControl
							refreshing={isFetchInProgress}
							onRefresh={fetchCoinList}
						/>
					}
					data={coinList}
					renderItem={renderCoinItem}
					keyExtractor={item => item.id}
					ListFooterComponent={FooterPlaceholder}
				/>
			</Container>
		</ScreenWrapper>
	);
};

CoinList.propTypes = {
	navigation: navigationType,
};

export default CoinList;
