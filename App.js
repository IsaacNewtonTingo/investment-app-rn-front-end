import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigators/auth-stack';
import TabNavigator from './src/navigators/tab-navigator';

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
