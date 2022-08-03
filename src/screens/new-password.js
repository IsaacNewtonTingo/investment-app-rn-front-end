import {Image, TextInput, ScrollView, View, Alert} from 'react-native';
import React, {useState} from 'react';
import styles from '../components/globalStyles';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Button, LoadingButton} from '../components/button';
import axios from 'axios';

export default function NewPassword({route, navigation}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');

  const userID = route.params.userID;

  const [isPosting, setIsPosting] = useState(false);

  const empty = () => {
    setPassword('');
    setConfirmPassword('');
    setSecretCode('');
  };

  async function resetPassword() {
    if (!password || !confirmPassword || !secretCode) {
      Alert.alert('All fields are required');
    } else if (password != confirmPassword) {
      Alert.alert("Passwords don't match");
    } else if (password.length < 8) {
      Alert.alert('Password should be at least 8 characters long');
    } else {
      setIsPosting(true);
      await axios
        .post('https://ebce-105-163-1-68.eu.ngrok.io/user/reset-password', {
          newPassword: password,
          userId: userID,
          resetString: secretCode,
        })
        .catch(err => {
          console.log(err);
          setIsPosting(false);
          empty();
        })
        .then(res => {
          empty();
          if (res.data.status == 'Success') {
            Alert.alert(res.data.message, 'Please login.', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Ok',
                onPress: () => navigation.navigate('Login'),
              },
            ]);
            setIsPosting(false);
          } else {
            console.log(res.data.message);
            Alert.alert(res.data.message);
            setIsPosting(false);
          }
        });
    }
  }
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <Image
        source={require('../assets/images/newPass.png')}
        style={[styles.leadIMG, {marginBottom: 40}]}
      />

      <View style={styles.textInputContainer}>
        <MaterialCommunityIcons
          style={styles.textInputIcon}
          name="qrcode-scan"
          size={20}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          value={secretCode}
          onChangeText={setSecretCode}
          placeholder="Secret code (e.g dghgf74674fgfb4ffbh)"
        />
      </View>

      <View style={styles.textInputContainer}>
        <Ionicons
          style={styles.textInputIcon}
          name="lock-closed-outline"
          size={20}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.textInputContainer}>
        <Entypo
          style={styles.textInputIcon}
          name="lock"
          size={20}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          secureTextEntry={true}
        />
      </View>

      {isPosting == true ? (
        <LoadingButton />
      ) : (
        <Button onPress={resetPassword} title="Submit" />
      )}
    </ScrollView>
  );
}
