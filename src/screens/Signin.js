/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

// create a component
const Signin = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    setVisible(true);
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        setVisible(false);
        if (res.docs !== []) {
          // console.log(JSON.stringify(res.docs[0].data()));
          const data = res.docs[0].data();
          if (data.password === password) {
            goToNext(data.name, data.email, data.userId);
          } else {
            Alert.alert('Wrong User Password');
          }
        } else {
          Alert.alert('User not found');
        }
      })
      .catch(error => {
        setVisible(false);
        console.log(error);
        Alert.alert('User not found');
      });
  };

  const goToNext = async (_name, _email, _userId) => {
    await AsyncStorage.setItem('NAME', _name);
    await AsyncStorage.setItem('EMAIL', _email);
    await AsyncStorage.setItem('USERID', _userId);
    navigation.navigate('Main');
  };

  const validate = () => {
    let isValid = true;

    if (email === '') {
      isValid = false;
    }

    if (password === '') {
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        placeholder="Enter Email"
        keyboardType="email-address"
        style={[styles.input, {marginTop: 50}]}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Enter Password"
        secureTextEntry={true}
        style={[styles.input, {marginTop: 20}]}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (validate()) {
            loginUser();
          } else {
            Alert.alert('Please Enter Correct Data');
          }
        }}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>
      <Text
        style={styles.orSignup}
        onPress={() => navigation.navigate('Signup')}>
        Or Sign Up
      </Text>
      <Loader visible={visible} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    alignSelf: 'center',
    marginTop: 100,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  btn: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#ffa611',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
  orSignup: {
    alignSelf: 'center',
    marginTop: 25,
    fontSize: 20,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: 'black',
  },
});

//make this component available to the app
export default Signin;
