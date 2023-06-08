//import liraries
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash';

const Stack = createNativeStackNavigator();
// create a component
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//make this component available to the app
export default AppNavigator;
