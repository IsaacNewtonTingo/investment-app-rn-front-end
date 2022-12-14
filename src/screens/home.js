import {
  Image,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import styles from '../components/globalStyles';
import colors from '../components/colors';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

import {BarIndicator} from 'react-native-indicators';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {CredentialsContext} from '../components/credentials-context';
import {Button} from '../components/button';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Home({route, navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [investModal, setShowInvestModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const [amount, setAmount] = useState('');
  const [accountBalance, setAccountBalance] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);

  const {firstName, lastName, phoneNumber, _id} = storedCredentials;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getUserData();
  }, [phoneNumber]);

  // use socket io to get real time updates

  async function getUserData() {
    await axios
      .post(
        'https://investment-app-backend.herokuapp.com/user/user-data/account-balance',
        {
          phoneNumber: phoneNumber,
        },
      )
      .then(response => {
        setAccountBalance(
          response.data.data[0].accountBalance
            ? response.data.data[0].accountBalance
            : 0,
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

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
            amount: parseInt(amount.replace(/,/g, '')),
            phoneNumber: parseInt(phoneNumber),
          },
        )
        .then(response => {
          console.log(response.data);
          setIsPosting(false);
          if (response.data.status == 'Success') {
            setShowModal(false);
            Alert.alert(response.data.message);
            setAmount('');
          } else {
            setShowModal(false);
            Alert.alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          setIsPosting(false);
        });
    }
  }

  async function investFunds() {
    if (!phoneNumber) {
      Alert.alert('Phone number is missing');
    } else if (!amount) {
      Alert.alert('Please enter amount');
    } else {
      setIsPosting(true);
      await axios
        .post(
          'https://investment-app-backend.herokuapp.com/payments/investment-payment',
          {
            phoneNumber: parseInt(phoneNumber),
            userID: _id,
            amountInvested: parseInt(amount.replace(/,/g, '')),
          },
        )
        .then(response => {
          console.log(response.data);
          setIsPosting(false);
          if (response.data.status == 'Success') {
            setShowInvestModal(false);
            Alert.alert(response.data.message);
          } else {
            setShowInvestModal(false);
            Alert.alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          setShowInvestModal(false);
          setIsPosting(false);
        });
    }
  }

  async function withdrawFunds() {
    if (!phoneNumber) {
      Alert.alert('Phone number is missing');
    } else if (!amount) {
      Alert.alert('Please enter amount');
    } else {
      setIsPosting(true);
      await axios
        .post(
          'https://investment-app-backend.herokuapp.com/payments/withdraw-funds',
          {
            phoneNumber: parseInt(phoneNumber),
            userID: _id,
            amount: parseInt(amount.replace(/,/g, '')),
          },
        )
        .then(response => {
          console.log(response.data);
          setIsPosting(false);
          if (response.data.status == 'Success') {
            setWithdrawModal(false);
            Alert.alert(response.data.message);
          } else {
            setWithdrawModal(false);
            Alert.alert(response.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          setIsPosting(false);
          setWithdrawModal(false);
        });
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('loginCredentials')
      .then(() => {
        setStoredCredentials('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  //nothing

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      keyboardShouldPersistTaps="always"
      style={styles.container}>
      {/* <View style={{marginBottom: 20}}>
        <Text style={styles.heading}>
          Hello {firstName} {lastName},
        </Text>
        <Text style={styles.heading}>Welcome back.</Text>
      </View> */}
      <LinearGradient colors={['blue', 'red']} style={styles.balanceContainer}>
        <ImageBackground
          style={{padding: 20, flex: 1, justifyContent: 'center'}}
          source={require('../assets/images/bg.png')}>
          <Text
            style={{
              color: 'gray',
              fontFamily: 'SourceSansPro-Bold',
            }}>
            Your balance
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 30,
              fontFamily: 'SourceSansPro-Bold',
            }}>
            KSH. {parseInt(accountBalance).toFixed(2)}
          </Text>
        </ImageBackground>
      </LinearGradient>

      <View style={styles.majorActionContainer}>
        <TouchableOpacity
          onPress={() => setShowInvestModal(true)}
          style={styles.actionContainer}>
          <LinearGradient style={styles.miBG} colors={['white', '#009933']}>
            <View style={styles.actionImageContainer}>
              <Image
                style={styles.actionImage}
                source={require('../assets/images/handCash.png')}
              />
            </View>
            <Text style={styles.actionText}>Invest</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={styles.actionContainer}>
          <LinearGradient style={styles.miBG} colors={['white', 'orange']}>
            <View style={styles.actionImageContainer}>
              <Image
                style={styles.actionImage}
                source={require('../assets/images/piggy.png')}
              />
            </View>
            <Text style={styles.actionText}>Deposit</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setWithdrawModal(true)}
          style={styles.actionContainer}>
          <LinearGradient style={styles.miBG} colors={['white', colors.purple]}>
            <View style={styles.actionImageContainer}>
              <Image
                style={styles.actionImage}
                source={require('../assets/images/withdraw.png')}
              />
            </View>
            <Text style={styles.actionText}>Withdraw</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.subHeading}>Recent activity</Text> */}

      {/* <Button title="Logout" onPress={logout} /> */}

      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.subHeading}>Deposit</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter phone number"
              value={phoneNumber.toString()}
              placeholderTextColor="gray"
              onChangeText={text => setPhoneNumber(text)}
              keyboardType="phone-pad"
              editable={false}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Enter amount"
              value={amount}
              placeholderTextColor="gray"
              onChangeText={text => setAmount(text)}
              keyboardType="numeric"
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

      <Modal
        visible={investModal}
        onRequestClose={() => setShowInvestModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.subHeading}>Invest</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter phone number"
              value={phoneNumber.toString()}
              placeholderTextColor="gray"
              onChangeText={text => setPhoneNumber(text)}
              keyboardType="phone-pad"
              editable={false}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Enter amount"
              value={amount}
              placeholderTextColor="gray"
              onChangeText={text => setAmount(text)}
              keyboardType="numeric"
            />

            {isPosting == false ? (
              <TouchableOpacity
                onPress={investFunds}
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
              onPress={() => setShowInvestModal(false)}
              style={[
                styles.button,
                {backgroundColor: '#ff3300', width: '80%'},
              ]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={withdrawModal}
        onRequestClose={() => setWithdrawModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.subHeading}>Withdraw</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter phone number"
              value={phoneNumber.toString()}
              placeholderTextColor="gray"
              onChangeText={text => setPhoneNumber(text)}
              keyboardType="phone-pad"
              editable={false}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Enter amount"
              value={amount}
              placeholderTextColor="gray"
              onChangeText={text => setAmount(text)}
              keyboardType="numeric"
            />

            {isPosting == false ? (
              <TouchableOpacity
                onPress={withdrawFunds}
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
              onPress={() => setWithdrawModal(false)}
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
