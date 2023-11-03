import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './Components/SignUp';
import Index from './Components/Index';
import Intro from './Components/Intro';
import {CartProvider} from './Components/ShopContext';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Index" component={Index} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
    
  );
};

export default App;

const styles = StyleSheet.create({});
