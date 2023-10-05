import { Platform } from "react-native";
import { ImgSystemPath } from "./ImgSystemPath";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";

const createNotificationChannel = async () => {
  try {
    await notifee.createChannel({
      id: "mainfresh",
      name: "Main Fresh Channel",
      description: "Channel for Main Fresh notifications",
      importance: AndroidImportance.HIGH, // Điều này cấu hình mức độ quan trọng của kênh
      sound: "default", // Cấu hình âm thanh mặc định (nếu muốn)
      vibration: true, // Cấu hình rung khi có thông báo (nếu muốn)
    });

    console.log("Channel 'mainfresh' created successfully.");
  } catch (error) {
    console.error("Error creating 'mainfresh' channel:", error);
  }
};

export {
  createNotificationChannel,
};
