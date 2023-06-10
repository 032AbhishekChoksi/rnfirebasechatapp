/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
//import liraries
import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useRoute, useIsFocused} from '@react-navigation/native';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

// create a component
const Chat = () => {
  const route = useRoute();
  const isFocued = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('LIGHT');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    getMode();
  }, [isFocued]);

  const getMode = async () => {
    setMode(await AsyncStorage.getItem('MODE'));
  };

  useEffect(() => {
    setVisible(true);
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    subscriber.onSnapshot(querysnapshot => {
      const allmessages = querysnapshot.docs.map(item => {
        return {...item._data, createdAt: item._data.createdAt};
      });
      setMessageList(allmessages);
    });
    setVisible(false);
    return () => subscriber();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setVisible(true);
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessageList(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );
    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc('' + route.params.data.userId + route.params.id)
      .collection('messages')
      .add(myMsg);
    setVisible(false);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: mode === 'LIGHT' ? 'white' : '#212121'},
      ]}>
      <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
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
    backgroundColor: '#212121',
  },
});

//make this component available to the app
export default Chat;
