/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Users from '../tabs/Users';
import Setting from '../tabs/Setting';

// create a component
const Main = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab === 0 ? <Users /> : selectedTab === 1 ? <Setting /> : null}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(0)}>
          <Image
            source={require('../images/users.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab === 0 ? '#ffffff' : '#704c00'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(1)}>
          <Image
            source={require('../images/setting.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab === 1 ? '#ffffff' : '#704c00'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#ffa611',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {width: 30, height: 30},
});

//make this component available to the app
export default Main;
