import {ScrollView, TextInput, Image, Text, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../components/globalStyles';

import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';

import {Button, LoadingButton} from '../components/button';
import axios from 'axios';

const A = props => <Text style={[styles.textLink]}>{props.children}</Text>;

export default function RegPayment({route, navigation}) {
  const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [referralCode, setReferralCode] = useState('');

  const [isPosting, setIsPosting] = useState(false);

  const userID = route.params.userID;

  async function pay() {
    if (!phoneNumber || !userID) {
      Alert.alert('Please input phone number');
    } else {
      setIsPosting(true);
      await axios
        .post(
          'https://investment-app-backend.herokuapp.com/payments/reg-fee-payment',
          {
            phoneNumberUsed: phoneNumber,
            userID: userID,
            referralCode: referralCode,
          },
        )
        .then(response => {
          setIsPosting(false);
          console.log(response.data);

          Alert.alert(response.data.message);
        })
        .catch(err => {
          setIsPosting(false);
          console.log(err);
        });
    }
  }
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <Image
        source={require('../assets/images/regPayment.png')}
        style={[styles.leadIMG, {width: 180, height: 200, marginBottom: 20}]}
      />

      <Text style={styles.subHeading}>Registration fee</Text>

      <Text style={[styles.text, {marginTop: 20, marginBottom: 40}]}>
        You are required to pay a registration fee of <A>KSH. 200</A> as stated
        in our <A>Terms and conditions</A>.{'\n'}
        {'\n'}If you have a referral code, you can use it to get{' '}
        <A>20% discount </A>on your registration fee.
      </Text>

      <View style={styles.textInputContainer}>
        <Entypo
          style={styles.textInputIcon}
          name="old-phone"
          size={20}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          value={phoneNumber.toString()}
          onChangeText={setPhoneNumber}
          placeholder="Phone number (e.g 0765667876)"
          keyboardType="phone-pad"
          editable={false}
        />
      </View>

      <View style={styles.textInputContainer}>
        <Octicons
          style={styles.textInputIcon}
          name="number"
          size={20}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          value={referralCode}
          onChangeText={setReferralCode}
          placeholder="Referral code (e.g yfy7e64rbvuft67r4gvf)"
        />
      </View>

      {isPosting == true ? (
        <LoadingButton />
      ) : (
        <Button onPress={pay} title="Proceed" />
      )}
    </ScrollView>
  );
}
