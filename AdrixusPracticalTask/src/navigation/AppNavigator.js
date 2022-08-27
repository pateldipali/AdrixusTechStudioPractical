import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BadCharactersList from '../screens/BadCharactersList';
import FavouriteCharactersList from '../screens/FavouriteCharactersList';
import Search from '../screens/Search';
import CharacterDetail from '../screens/CharacterDetail';
import { navigationRef } from './NavigationService';

const AppStack = createStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <AppStack.Navigator headerMode={"none"} initialRouteName={'BadCharactersList'} screenOptions={{ animationEnabled: false }}>
                <AppStack.Screen name="BadCharactersList" component={BadCharactersList} />
                <AppStack.Screen name="FavouriteCharactersList" component={FavouriteCharactersList} />
                <AppStack.Screen name="Search" component={Search} />
                <AppStack.Screen name="CharacterDetail" component={CharacterDetail} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}



export default AppNavigator