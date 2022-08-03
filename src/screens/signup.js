import {
  ScrollView,
  Alert,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import styles from '../components/globalStyles';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, LoadingButton} from '../components/button';
import axios from 'axios';

const A = props => <Text style={styles.textLink}>{props.children}</Text>;

export default function SignUp({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNUmber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPosting, setIsPosting] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const empty = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNUmber('');
    setPassword('');
    setConfirmPassword('');
  };

  async function signup() {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('All fields are required');
      setIsPosting(false);
    } else if (password != confirmPassword) {
      Alert.alert("Passwords don't match");
    } else if (password.length < 8) {
      Alert.alert('Password should be at least 8 characters long');
    } else if (firstName.length < 3) {
      Alert.alert('Name is too short');
    } else if (firstName.length < 3) {
      Alert.alert('Name is too short');
    } else if (phoneNumber.length != 10) {
      Alert.alert('Invalid phone number');
    } else if (!phoneNumber.startsWith(0)) {
      Alert.alert('Invalid phone number');
    } else {
      setIsPosting(true);
      setButtonDisabled(true);
      await axios
        .post('https://investment-app-backend.herokuapp.com/user/signup', {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber.replace(0, 254),
          password: password,
        })
        .then(response => {
          setButtonDisabled(false);
          console.log(response.data);
          empty();
          if (response.data.status == 'Pending') {
            setIsPosting(false);
            setButtonDisabled(false);
            navigation.navigate('EmailVerificationScreen');
          } else {
            Alert.alert(response.data.message);
            setButtonDisabled(false);
            setIsPosting(false);
          }
        })
        .catch(err => {
          empty();
          setButtonDisabled(false);
          setIsPosting(false);
          console.log(err);
        });
    }
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      bounces={true}
      style={styles.container}>
      <Image
        style={styles.leadIMG}
        source={require('../assets/images/sitCash.png')}
      />
      <View style={styles.textInputContainer}>
        <Ionicons
          style={styles.textInputIcon}
          name="person"
          size={20}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name (e.g Jane)"
        />
      </View>

      <View style={styles.textInputContainer}>
        <Ionicons
          style={styles.textInputIcon}
          name="person-outline"
          size={20}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name (e.g Doe)"
        />
      </View>

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

      <View style={styles.textInputContainer}>
        <Entypo
          style={styles.textInputIcon}
          name="old-phone"
          size={20}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          value={phoneNumber}
          onChangeText={setPhoneNUmber}
          placeholder="Phone number (e.g 0765667876)"
          keyboardType="phone-pad"
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

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          By signing up you choose to agree to our{' '}
        </Text>
        <TouchableOpacity>
          <Text style={styles.textLink}>Terms and conditions</Text>
        </TouchableOpacity>
      </View>

      {isPosting == true ? (
        <LoadingButton />
      ) : (
        <Button disabled={buttonDisabled} onPress={signup} title="Signup" />
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          style={[
            styles.text,
            {
              marginTop: 20,
              textAlign: 'center',
              marginBottom: 100,
              fontSize: 16,
            },
          ]}>
          Already have an account? <A>Login</A>{' '}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
