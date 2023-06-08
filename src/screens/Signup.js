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
import uuid from 'react-native-uuid';
import Loader from '../components/Loader';

// create a component
const Signup = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = () => {
    setVisible(true);
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
      })
      .then(res => {
        setVisible(false);
        console.log('user created');
        navigation.navigate('Signin');
      })
      .catch(error => {
        setVisible(false);
        console.log(error);
      });
  };

  const validate = () => {
    let isValid = true;

    if (name === '') {
      isValid = false;
    }

    if (email === '') {
      isValid = false;
    }

    if (mobile === '') {
      isValid = false;
    }

    if (password === '') {
      isValid = false;
    }

    if (confirmPassword === '') {
      isValid = false;
    }

    if (confirmPassword !== password) {
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Enter Name"
        style={[styles.input, {marginTop: 50}]}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter Email"
        keyboardType="email-address"
        style={[styles.input, {marginTop: 20}]}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Enter Mobile"
        keyboardType="phone-pad"
        style={[styles.input, {marginTop: 20}]}
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        placeholder="Enter Password"
        secureTextEntry={true}
        style={[styles.input, {marginTop: 20}]}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TextInput
        placeholder="Enter Confirm Password"
        secureTextEntry={true}
        style={[styles.input, {marginTop: 20}]}
        value={confirmPassword}
        onChangeText={txt => setConfirmPassword(txt)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (validate()) {
            registerUser();
          } else {
            Alert.alert('Please Enter Correct Data');
          }
        }}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.orSignin} onPress={() => navigation.goBack()}>
        Or Sign In
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
  orSignin: {
    alignSelf: 'center',
    marginTop: 25,
    fontSize: 20,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: 'black',
  },
});

//make this component available to the app
export default Signup;
