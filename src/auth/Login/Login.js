import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotifierRoot, Notifier, Easing } from "react-native-notifier";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Button from "../../components/Button";
import Fire from "../../../Firebase";
import { JustifyCenter, Container } from "../../CommonStyle/commonStyle";
import * as colors from "../../Token/token";

const styles = StyleSheet.create({
  container: Container,
  just: JustifyCenter,
  textInput: {
    color: "black",
    backgroundColor: colors.White,
    margin: 20,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("30%"),
  },
  text: {
    color: colors.ShipCove,
    lineHeight: 20,
    fontSize: 13,
    textAlign: "center",
    marginVertical: 10,
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

export default function Login({ navigation }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const notifierRef = useRef();

  const loginHandler = () => {
    setLoading(true);
    Fire.auth()
      .signInWithEmailAndPassword(Email, Password)
      .then(() => {
        setLoading(false);
        navigation.navigate("Home");
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

      <View style={styles.view}>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.text}>
            Dont have an account?
            <Text style={{ color: colors.Crusta }}>Signup</Text>
          </Text>
        </TouchableOpacity>

        <Button text="Login" onPress={loginHandler} />
      </View>

      <NotifierRoot ref={notifierRef} />
    </SafeAreaView>
  );
}
