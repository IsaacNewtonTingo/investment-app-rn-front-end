import {
  Image,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import styles from '../components/globalStyles';
import colors from '../components/colors';
import LinearGradient from 'react-native-linear-gradient';

export default function Home({route, navigation}) {
  return (
    <ScrollView style={styles.container}>
      {/* <View style={{marginBottom: 20}}>
        <Text style={styles.heading}>Welcome,</Text>
        <Text style={styles.heading}>Isaac Tingo</Text>
      </View> */}
      <LinearGradient colors={['blue', 'red']} style={styles.balanceContainer}>
        <Text
          style={{
            color: '#bfbfbf',
            fontWeight: '800',
            fontFamily: 'SourceSansPro-Regular',
          }}>
          Your balance
        </Text>
        <Text
          style={{
            color: 'white',
            fontWeight: '800',
            fontSize: 20,
            fontFamily: 'SourceSansPro-Regular',
          }}>
          KSH. 0.00
        </Text>
      </LinearGradient>

      <View style={styles.majorActionContainer}>
        <TouchableOpacity
          style={[styles.actionContainer, {backgroundColor: '#009933'}]}>
          <View style={styles.actionImageContainer}>
            <Image
              style={styles.actionImage}
              source={require('../assets/images/handCash.png')}
            />
          </View>
          <Text style={styles.actionText}>Invest</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionContainer, {backgroundColor: 'orange'}]}>
          <View style={styles.actionImageContainer}>
            <Image
              style={styles.actionImage}
              source={require('../assets/images/piggy.png')}
            />
          </View>
          <Text style={styles.actionText}>Deposit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionContainer, {backgroundColor: colors.purple}]}>
          <View style={styles.actionImageContainer}>
            <Image
              style={styles.actionImage}
              source={require('../assets/images/withdraw.png')}
            />
          </View>
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
