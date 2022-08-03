import {TextInput, ScrollView, Image, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
import styles from '../components/globalStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, LoadingButton} from '../components/button';
import axios from 'axios';

const A = props => <Text style={[styles.textLink, {}]}>{props.children}</Text>;

export default function ResetPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const empty = () => {
    setEmail('');
  };

  async function sendResetEmail() {
    if (!email) {
      Alert.alert('Please enter your email address');
    } else {
      setIsPosting(true);
      await axios
        .post(
          'https://ebce-105-163-1-68.eu.ngrok.io/user/request-password-reset',
          {
            email: email,
          },
        )
        .catch(err => {
          console.log(err);
          setIsPosting(false);
          empty();
        })
        .then(res => {
          empty();
          if (res.data.status == 'Pending') {
            Alert.alert('Check your email for secret code');
            navigation.navigate('NewPassword', {userID: res.data.message});
            setIsPosting(false);
          } else {
            setIsPosting(false);
          }
          setIsPosting(false);
        });
    }
  }
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <Image
        source={require('../assets/images/resetPass.png')}
        style={styles.leadIMG}
      />

      <Text style={[styles.text, {margin: 20}]}>
        Enter an <A>email address</A> you used to sign up.{'\n'}A code will be
        sent to the address that you will use to <A>reset your password</A>
      </Text>

      <View style={styles.textInputContainer}>
        <Entypo
          style={styles.textInputIcon}
          name="email"
          size={20}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Email (e.g janedoe@hotmail.com)"
          keyboardType="email-address"
        />
      </View>

      {isPosting == true ? (
        <LoadingButton />
      ) : (
        <Button onPress={sendResetEmail} title="Submit" />
      )}
    </ScrollView>
  );
}
