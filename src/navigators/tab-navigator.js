import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './home-stack';
import colors from '../components/colors';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={() => ({
        tabBarActiveTintColor: '#ff6600',
        tabBarInactiveTintColor: 'white',
        headerStyle: {
          backgroundColor: colors.tabs,
        },
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: colors.tabs,
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          headerTitle: '',
          tabBarIcon: ({focused, color, size}) => {
            return <AntDesign name="home" size={30} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
