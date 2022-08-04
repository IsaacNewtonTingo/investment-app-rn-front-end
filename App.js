import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigators/auth-stack';
import TabNavigator from './src/navigators/tab-navigator';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {CredentialsContext} from './src/components/credentials-context';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');

  useEffect(() => {
    checkLoginCredentials();
  }, []);

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('loginCredentials')
      .then(result => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <CredentialsContext.Provider
      value={{storedCredentials, setStoredCredentials}}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </CredentialsContext.Provider>
  );
}
