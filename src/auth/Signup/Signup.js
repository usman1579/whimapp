import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotifierRoot } from "react-native-notifier";
import { Notifier, Easing } from "react-native-notifier";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Fire from "../../../Firebase";
import Button from "../../components/Button";
import { ShipCove } from "../../Token/token";
import { Container, JustifyCenter } from "../../CommonStyle/commonStyle";

import * as Firebase from "firebase/app";

const styles = StyleSheet.create({
  container: Container,
  just: JustifyCenter,
  bottomview: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("25%"),
  },
  text: {
    color: ShipCove,
    lineHeight: 20,
    fontSize: 13,
    textAlign: "center",
    marginVertical: 10,
  },
  textInput: {
    color: "black",
    backgroundColor: "white",
    margin: 20,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function Signup({ navigation }) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const notifierRef = useRef();

  const signupHandler = async () => {
    setLoading(true);
    const credential = Firebase.auth.EmailAuthProvider.credential(
      Email,
      Password
    );
    Fire.auth()
      .currentUser.linkWithCredential(credential)
      .then((res) => {
        res.user.updateProfile({
          displayName: Name,
        });

        Fire.firestore()
          .collection("USERS")
          .doc(res.user.uid)
          .set({
            Name: Name,
            Email: Email,
            ID: res.user.uid,
            Notification: true,
          })
          .then(() => {
            setLoading(false);
            navigation.navigate("Home");
          })
          .catch((err) => {
            console.log("set data failed", err);
          });
      })
      .catch((error) => {
        setLoading(false);
        Notifier.showNotification({
          title: "Error",
          description: error.message,
          duration: 0,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          onHidden: () => console.log("Hidden"),
          onPress: () => console.log("Press"),
          hideOnPress: true,
        });
      });
  };

  return (
    <SafeAreaView style={[styles.container, styles.just]}>
      {Loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}

      <TextInput
        label="Name"
        selectionColor="black"
        style={styles.textInput}
        value={Name}
        onChangeText={(name) => setName(name)}
      />

      <TextInput
        label="Email"
        selectionColor="black"
        style={styles.textInput}
        value={Email}
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        label="Password"
        secureTextEntry
        selectionColor="black"
        style={styles.textInput}
        value={Password}
        onChangeText={(pass) => setPassword(pass)}
      />

      <View style={styles.bottomview}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.text}>
            Dont have an account?
            <Text style={{ color: "#FF5D1B" }}>Login</Text>
          </Text>
        </TouchableOpacity>

        <Button text="Signup" onPress={signupHandler} />
      </View>

      <NotifierRoot ref={notifierRef} />
    </SafeAreaView>
  );
}
