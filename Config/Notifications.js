import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";
import {Platform} from 'react-native';
import {ImgSystemPath} from "./ImgSystemPath";
import messaging from '@react-native-firebase/messaging';

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(data) {
    //console.log("sendPushNotification", data.android.imageUrl)
    await Notifications.scheduleNotificationAsync({
        identifier: 'image-notification',
        content: {
            title: data.title,
            subtitle:data.subtitle??"",
            body: data.body,
            sound:true,
        },
        android: {
            imageUrl: data.android.imageUrl
        },
        trigger: null,
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });

    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
            icon: "../assets/SystemImg/icon.png"
        }),
    });

    Notifications.addNotificationResponseReceivedListener(response => {
        console.log("response", response);
    });
    console.log("token", token)
    return token;
}

export {
    registerForPushNotificationsAsync,
    sendPushNotification
}
