import React, { useState, useEffect , useRef} from "react";
import { StyleSheet, Text, View, Switch } from "react-native";

import { White, Primary_Dark, secondary } from "../../Token/token";
import Fire from '../../../Firebase'
import { useSelector, useDispatch } from 'react-redux'
import { NotifierRoot, Notifier, Easing } from "react-native-notifier";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: White,
  },
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  notification: {
    fontSize: 15,
    fontWeight: "bold",
    color: Primary_Dark,
  },
  text1: {
    color: secondary,
    marginHorizontal: 25,
    marginVertical: 10,
    fontSize: 15,
  },
  text2: {
    color: secondary,
    marginHorizontal: 25,
    marginVertical: 10,
    fontSize: 15,
  },
});

export default function Notification() {
  const [isEnabled, setIsEnabled] = useState(false);
  const notifierRef = useRef();
  const User = useSelector(state => state.USER)

  useEffect(() => {
    Fire.firestore().collection("USERS").doc(User.uid)
    .get()
    .then(response => {
      setIsEnabled(response.data().Notification)
    }).catch(err => {
      Notifier.showNotification({
        title: "Error",
        description: err.message,
        duration: 0,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        onHidden: () => console.log("Hidden"),
        onPress: () => console.log("Press"),
        hideOnPress: true,
      });
    })
  }, [])

  const toggleSwitch = () => {
    if (isEnabled) {
      setIsEnabled(false)
      Fire
        .firestore()
        .collection("USERS")
        .doc(User.uid)
        .update({
          Notification: false
        })
    }
    else {
      setIsEnabled(true)
      Fire
        .firestore()
        .collection("USERS")
        .doc(User.uid)
        .update({
          Notification: true
        })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.notication}>All Notifications</Text>

        <Switch
          // trackColor={{ false: "#767577", true: "#81b0ff" }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          // ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <Text style={styles.text1}>
        This settings enables or disable all the notification related with due
        dates.
      </Text>

      <Text style={styles.text2}>
        You can disable one particular inside each whim.
      </Text>


      <NotifierRoot ref={notifierRef} />
    </View>
  );
}
