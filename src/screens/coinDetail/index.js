import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {ActivityIndicator, RefreshControl} from 'react-native';
import ScreenWrapper from '@components/ScreenWrapper';
import {fetchCoinDetail as fetchCoinDetailApi} from '@api';

const StyledScreenWrapper = styled(ScreenWrapper)`
	background: #fff;
`;

const Container = styled.ScrollView`
	padding-horizontal: 16px;
	padding-top: 20px;
	flex: 1;
`;

const Title = styled.Text`
	font-weight: 500;
	font-size: 20px;
	line-height: 25px;

	color: #212529;
`;

const Description = styled.Text`
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	color: #6c757d;
	padding-top: 10px;
`;

const IndicatorContainer = styled.View`
	justify-content: center;
	margin-bottom: 100px;
	flex: 1;
`;

const Seperator = styled.View`
	border-bottom-color: #dfe2e4;
	border-bottom-width: 1px;
	margin-vertical: 15px;
`;

const Row = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Label = styled.Text`
	font-weight: 600;
	font-size: 14px;
	line-height: 18px;
`;

const Value = styled(Label)`
	font-weight: 400;
`;

const CoinDetail = ({route, navigation}) => {
	const {coinId, name} = route.params;
	const [coinDetail, setCoinDetail] = useState(null);

	useEffect(() => {
		fetchCoinDetail();
	}, [coinId]);

	async function fetchCoinDetail() {
		const detail = await fetchCoinDetailApi(coinId);

		setCoinDetail(detail);
	}

	function getHomePageUrl() {
		const validUrlList = coinDetail.links.homepage.filter(url => !!url);
		const [firstUrl] = validUrlList;

		return firstUrl ?? '';
	}

	function renderDetail() {
		if (!coinDetail) {
			return (
				<IndicatorContainer>
					<ActivityIndicator size="large" />
				</IndicatorContainer>
			);
		}

		const {
			description,
			market_data,
			genesis_date,
			hashing_algorithm,
			symbol,
		} = coinDetail;

		return (
			<>
				<Description numberOfLines={8} ellipsizeMode="tail">
					{description?.en}
				</Description>
				<Seperator />
				<Row>
					<Label>Market cap.</Label>
					<Value>€ {market_data?.market_cap?.eur}</Value>
				</Row>
				<Seperator />
				<Row>
					<Label>Symbol</Label>
					<Value>{symbol.toUpperCase()}</Value>
				</Row>
				<Seperator />
				<Row>
					<Label>Home page</Label>
					<Value>{getHomePageUrl()}</Value>
				</Row>
				<Seperator />
				<Row>
					<Label>Genesis date</Label>
					<Value>{genesis_date}</Value>
				</Row>
				<Seperator />
				<Row>
					<Label>Hashing algorithm</Label>
					<Value>{hashing_algorithm}</Value>
				</Row>
			</>
		);
	}

	return (
		<StyledScreenWrapper>
			<Container
				refreshControl={
					<RefreshControl
						refreshing={false}
						onRefresh={fetchCoinDetail}
					/>
				}>
				<Title>{name}</Title>
				{renderDetail()}
			</Container>
		</StyledScreenWrapper>
	);
};

export default CoinDetail;
