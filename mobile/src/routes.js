import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IncidentsPage from './pages/incidents';
import DetailPage from './pages/detail';

const AppStack = createStackNavigator();

function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown:false }}>
                <AppStack.Screen name="IncidentsPage" component={IncidentsPage} />
                <AppStack.Screen name="DetailPage" component={DetailPage} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;