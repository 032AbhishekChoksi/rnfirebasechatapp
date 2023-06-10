/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
// create a component
const Setting = () => {
  const [mode, setMode] = useState('LIGHT');
  const isFocued = useIsFocused();

  const changeMode = async e => {
    await AsyncStorage.setItem('MODE', e);
  };

  useEffect(() => {
    getMode();
  }, [isFocued]);

  const getMode = async () => {
    setMode(await AsyncStorage.getItem('MODE'));
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: mode === 'LIGHT' ? 'white' : '#212121'},
      ]}>
      <View style={styles.themChangeView}>
        <Text style={{color: mode === 'LIGHT' ? 'black' : 'white'}}>
          Change Mode
        </Text>
        <TouchableOpacity
          style={[
            styles.btn,
            {backgroundColor: mode === 'LIGHT' ? 'black' : 'white'},
          ]}
          onPress={() => {
            setMode(mode === 'LIGHT' ? 'DARK' : 'LIGHT');
            changeMode(mode === 'LIGHT' ? 'DARK' : 'LIGHT');
          }}>
          <Text style={{color: mode === 'LIGHT' ? 'white' : 'black'}}>
            {mode === 'DARK' ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themChangeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  btn: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

//make this component available to the app
export default Setting;
