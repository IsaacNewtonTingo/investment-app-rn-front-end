import * as React from 'react';
import {View, Text, Image} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/home';
import styles from '../components/globalStyles';
import colors from '../components/colors';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <View style={styles.logoIMGContainer}>
      <Image
        style={styles.logoIMG}
        source={require('../assets/images/logo.png')}
      />
    </View>
  );
}

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.tabs,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          // headerShown: false,
          headerTitle: 'Home',
          title: '',
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
