import * as React from 'react';
import {View, Text, Image} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CredentialsContext} from '../components/credentials-context';

import SignUp from '../screens/signup';
import Login from '../screens/login';
import ResetPassword from '../screens/reset-password';
import NewPassword from '../screens/new-password';
import RegPayment from '../screens/reg-payment';
import EmailVerificationScreen from '../screens/email-verification';
import TabNavigator from './tab-navigator';

import styles from '../components/globalStyles';
import HomeStack from './home-stack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  function LogoTitle() {
    return (
      <View>
        <Image
          style={styles.logoIMG}
          source={{
            uri: 'https://w7.pngwing.com/pngs/973/11/png-transparent-logo-phoenix-illustration-phoenix-logo-design-phoenix-illustration-free-logo-design-template-photography-orange-thumbnail.png',
          }}
        />
      </View>
    );
  }

  return (
    <CredentialsContext.Consumer>
      {({storedCredentials}) => (
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
          }}>
          {storedCredentials ? (
            <Stack.Screen
              name="HomeStack"
              component={HomeStack}
              options={{
                headerTitle: 'Registration fee',
                headerShown: false,
              }}
            />
          ) : (
            <>
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
            </>
          )}
        </Stack.Navigator>
      )}
    </CredentialsContext.Consumer>
  );
}
