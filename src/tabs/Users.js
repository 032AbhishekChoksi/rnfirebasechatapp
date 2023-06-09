//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';
let userId = '';

// create a component
const Users = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setVisible(true);
    let tempData = [];
    const email = await AsyncStorage.getItem('EMAIL');
    userId = await AsyncStorage.getItem('USERID');

    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        setVisible(false);
        if (res.docs !== []) {
          res.forEach(element => tempData.push(element.data()));
        }
        setUsers(tempData);
      })
      .catch(error => {
        setVisible(false);
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RN Firebase Chat App</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => {
                navigation.navigate('Chat', {data: item, id: userId});
              }}>
              <Image
                source={require('../images/user.png')}
                style={styles.userIcon}
              />
              <Text style={styles.userName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
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
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {color: '#ffa611', fontSize: 20, fontWeight: '600'},
  userItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    alignItems: 'center',
  },
  userIcon: {width: 40, height: 40},
  userName: {
    color: 'black',
    marginLeft: 20,
    fontSize: 20,
  },
});

//make this component available to the app
export default Users;
