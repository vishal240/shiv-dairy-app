// src/pushNotifications.ts
import {
  PushNotifications,
  type PushNotificationSchema,
  type Token,
} from "@capacitor/push-notifications";
import ApiService from "../services/api";
export const initPushNotifications = () => {
  PushNotifications.requestPermissions().then((result) => {
    if (result.receive === "granted") {
      PushNotifications.register();
    }
  });

  PushNotifications.addListener("registration", (token: Token) => {
    console.log("Push registration success, token: " + token.value);
    if (token.value) {
      ApiService.post(
        "/user/addFcmToken",
        { token: token.value },
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      )
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    // send this token to your server
  });

  PushNotifications.addListener("registrationError", (err) => {
    console.error("Push registration error: ", err);
  });

  PushNotifications.addListener(
    "pushNotificationReceived",
    (notification: PushNotificationSchema) => {
      console.log("Push received in foreground: ", notification);
      // show custom toast/snackbar
    }
  );

  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    (notification) => {
      console.log("Push action performed", notification);
      // navigate to screen or show data
    }
  );
};
