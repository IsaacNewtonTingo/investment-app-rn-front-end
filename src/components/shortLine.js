import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styles from './globalStyles';

export function ShortLine() {
  return <View style={styles.shortLine} />;
}

export function LongLine() {
  return <View style={[styles.longLine, {marginBottom: 20}]} />;
}
