import {
  Image,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import styles from '../components/globalStyles';
import colors from '../components/colors';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

import {BarIndicator} from 'react-native-indicators';

export default function Home({route, navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  async function processDeposit() {
    if (!phoneNumber) {
      Alert.alert('Please enter phone number');
    } else if (!amount) {
      Alert.alert('Please input amount to deposit');
    } else {
      setIsPosting(true);
      await axios
        .post(
          'https://investment-app-backend.herokuapp.com/payments/deposit-funds',
          {
            amount: amount,
            phoneNumber: phoneNumber,
          },
        )
        .then(response => {
          console.log(response.data);
          setIsPosting(false);
          if (response.data.status == 'Success') {
            setShowModal(false);
            Alert.alert(response.data.message);
          } else {
            Alert.alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          setIsPosting(false);
        });
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
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
          onPress={() => setShowModal(true)}
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

      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter phone number"
              value={phoneNumber}
              placeholderTextColor="gray"
              onChangeText={text => setPhoneNumber(text)}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Enter amount"
              value={amount}
              placeholderTextColor="gray"
              onChangeText={text => setAmount(text)}
            />

            {isPosting == false ? (
              <TouchableOpacity
                onPress={processDeposit}
                style={[
                  styles.button,
                  {backgroundColor: '#006699', width: '80%'},
                ]}>
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={true}
                style={[
                  styles.button,
                  {backgroundColor: '#006696', width: '80%'},
                ]}>
                <BarIndicator size={20} color="white" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={[
                styles.button,
                {backgroundColor: '#ff3300', width: '80%'},
              ]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
