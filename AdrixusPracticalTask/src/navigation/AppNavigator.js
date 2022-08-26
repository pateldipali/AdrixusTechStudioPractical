import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BadCharactersList from '../screens/BadCharactersList';


const AppStack = createStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode={"none"} initialRouteName={'BadCharactersList'} screenOptions={{ animationEnabled: false }}>
                <AppStack.Screen name="BadCharactersList" component={BadCharactersList} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}



export default AppNavigator