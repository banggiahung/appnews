import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import Navigation from "./Config/Navigation";
import { store } from "./Config/configureStore";
import messaging, { firebase } from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";
import { PermissionsAndroid, View, Text, Image } from "react-native";
import { AppOpenAd, TestIds, AdEventType } from "react-native-google-mobile-ads";
import axios from "./Config/Axios";
import { createNotificationChannel } from "./Config/Notifications";



export default function App() {

  async function onDisplayNotification({title, body}) {

    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId:"default",
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  const requestUserPermission = async () => {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log("Authorization status:", authStatus);
      }
    } catch (error) {
      console.error("Firebase Error:", error);
    }
  };

  useEffect(listener => {
    if (requestUserPermission()) {
      //createNotificationChannel()
      messaging()
        .getToken()
        .then(token => console.log("token2", token));
    } else {
      console.log("Failed token status");
    }

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            "Thông báo khiến ứng dụng mở từ trạng thái thoát:",
            remoteMessage.notification,
          );
        }
      });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        "Vào đây trước",
        remoteMessage.notification,
      );
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Vào đây sau", remoteMessage.notification);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const { title, body } = remoteMessage.notification;
      console.log(title);
      // xử lý thông báo khi người dùng đang hoạt động
      await onDisplayNotification({title, body})
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
