//import liraries
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// create a component
const Splash = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{'Firebase Chat\nApp'}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa611',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
});

//make this component available to the app
export default Splash;
