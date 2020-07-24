import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Fire from "../../Firebase";

export const registerForPushNotificationsAsync = async () => {
  /* console.log("token waited"); */
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  let token = await Notifications.getExpoPushTokenAsync();
  /* console.log("token", token); */

  // Stop here if the user did not grant permissions
  if (status !== "granted") {
    return;
  }
  // Get the token that uniquely identifies this device

  const userID = Fire.auth().currentUser.uid;
  Fire.firestore()
    .collection("USERS")
    .doc(userID)
    .update({ token: token })
    .then(() => {
      console.log("Success");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
