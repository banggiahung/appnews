import {Provider} from "react-redux"
import {useEffect, useState} from 'react';
import Navigation from './Config/Navigation'
import {store} from "./Config/configureStore";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {

  // const requestUserPermission = async () => {
  //     try {
  //         await registerForPushNotificationsAsync()
  //         const authStatus = await messaging().requestPermission();
  //         const enabled =
  //             authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //             authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //         if (enabled) {
  //             console.log('Authorization status:', authStatus);
  //         }
  //     } catch (error) {
  //         console.error('Firebase Error:', error);
  //     }
  // }

  // useEffect(listener => {

  //     if (requestUserPermission()) {
  //         messaging().getToken().then(token => console.log("token", token))
  //     } else {
  //         console.log("Failed token status")
  //     }
  //     messaging()
  //         .getInitialNotification()
  //         .then(remoteMessage => {
  //             if (remoteMessage) {
  //                 console.log(
  //                     'Notification caused app to open from quit state:',
  //                     remoteMessage.notification,
  //                 );
  //             }
  //         });
  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //         console.log(
  //             'Notification caused app to open from background state:',
  //             remoteMessage.notification,
  //         );
  //     });
  //     messaging().setBackgroundMessageHandler(async remoteMessage => {
  //         console.log('Message handled in the background!', remoteMessage);
  //     });
  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //         await sendPushNotification(remoteMessage.notification);
  //     });
  //     return unsubscribe;
  // }, []);


  return (
      <Provider store={store}>

          <Navigation/>

      </Provider>
  );
}