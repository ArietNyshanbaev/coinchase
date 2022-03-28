import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SCREEN_NAMES from '@constants/screenNames';
import CoinList from '@screens/coinList';
import CoinDetail from '@screens/coinDetail';

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShadowVisible: false,
				}}>
				<Stack.Screen
					name={SCREEN_NAMES.COIN_LIST.name}
					component={CoinList}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name={SCREEN_NAMES.COIN_DETAIL.name}
					component={CoinDetail}
					options={{
						title: 'Coin Detail',
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
