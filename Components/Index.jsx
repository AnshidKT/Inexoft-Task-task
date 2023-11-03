import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import MyCart from './MyCart';

const Index = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../imgs/Home-one.png')
                  : require('../imgs/Home-two.png')
              }
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="My Cart"
        component={MyCart}
        options={{
          tabBarLabel: 'My Cart',
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../imgs/Cart-One.png')
                  : require('../imgs/Cart-two.png')
              }
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
