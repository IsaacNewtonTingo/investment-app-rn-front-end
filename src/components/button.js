import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './globalStyles';

import {BarIndicator} from 'react-native-indicators';

export function Button(props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={styles.button}
      onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export function LoadingButton() {
  return (
    <TouchableOpacity disabled={true} style={styles.button}>
      <BarIndicator size={20} color="white" />
    </TouchableOpacity>
  );
}
