import {Text, Image, View} from 'react-native';
import React from 'react';
import styles from '../components/globalStyles';
import {Button} from '../components/button';
import {ShortLine} from '../components/shortLine';

const A = props => <Text style={styles.textLink}>{props.children}</Text>;

export default function EmailVerificationScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.leadIMG}
        source={require('../assets/images/email.png')}
      />

      <ShortLine />

      <Text style={[styles.text, {fontSize: 18, textAlign: 'center'}]}>
        If the email provided belongs to you, check your <A> inbox</A> for a
        <A> confirmation link</A> to verify your email then come back and
        <A> login</A> . {'\n'} The link expires in 6 hrs
      </Text>

      <ShortLine />

      <Button
        onPress={() => navigation.navigate('Login')}
        title="Proceed to login"
      />
    </View>
  );
}
