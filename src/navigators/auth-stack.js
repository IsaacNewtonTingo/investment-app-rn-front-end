import * as React from 'react';
import {View, Text, Image} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUp from '../screens/signup';
import Login from '../screens/login';
import ResetPassword from '../screens/reset-password';
import NewPassword from '../screens/new-password';
import RegPayment from '../screens/reg-payment';
import EmailVerificationScreen from '../screens/email-verification';
import TabNavigator from './tab-navigator';

import styles from '../components/globalStyles';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  function LogoTitle() {
    return (
      <View>
        <Image
          style={styles.logoIMG}
          source={require('../assets/images/logo.png')}
        />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: 'Create account',
        }}
      />

      <Stack.Screen name="Login" component={Login} options={{}} />

      <Stack.Screen
        name="EmailVerificationScreen"
        component={EmailVerificationScreen}
        options={{
          headerTitle: 'Email verification',
        }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerTitle: 'Reset passwrod',
        }}
      />

      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{
          headerTitle: 'New passwrod',
        }}
      />

      <Stack.Screen
        name="RegPayment"
        component={RegPayment}
        options={{
          headerTitle: 'Registration fee',
        }}
      />

      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerTitle: 'Registration fee',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
