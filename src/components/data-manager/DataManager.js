import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import './App.css';
import Input from './components/Input/Input';
import LoginForm from './components/LoginForm';
import Messages from './components/Messages/Messages';
import chatAPI from './services/chatapi';
import { randomColor } from './utils/common';


const SOCKET_URL = 'http://localhost:8080/ws-chat/';

const DataManager = (props) => {
  const { url, onMessage, onConnect } = props

  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);
    onMessage(msg)
  }

  // let onSendMessage = (msgText) => {
  //   chatAPI.sendMessage(user.username, msgText).then(res => {
  //     console.log('Sent', res);
  //   }).catch(err => {
  //     console.log('Error Occured while sending message to api');
  //   })
  // }

  let handleLoginSubmit = (username) => {
    console.log(username, " Logged in..");

    setUser({
      username: username,
      color: randomColor()
    })

  }

  return (
    <SockJsClient
      url={url}
      topics={['/topic/group']}
      onConnect={onConnected}
      onDisconnect={console.log("Disconnected!")}
      onMessage={msg => onMessageReceived(msg)}
      debug={false}
    />
  )
}

export const useUserProfile = singletonHook('http://localhost:8080/ws-chat/', useUserProfileImpl);
