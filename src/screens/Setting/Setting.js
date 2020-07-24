import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Container } from "../../CommonStyle/commonStyle";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import SettinItem from "./SettingItem";
import { useSelector } from "react-redux";
import Fire from "../../../Firebase";
import * as colors from "../../Token/token";
import { Gravatar } from "react-native-gravatar";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: Container,
  headerbackcolor: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  headerTitleView: {
    alignItems: "flex-start",
    flex: 1,
  },
  HeaderTitle: {
    color: colors.Black,
    fontWeight: "bold",
    fontFamily: "Gilroy-Bold",
    fontSize: 20,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: "lightgrey",
  },
  profile: {
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10,
    height: 80,
  },
  round: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  textView: {
    flex: 4,
    justifyContent: "center",
    margin: 12,
    marginVertical: 15,
  },
  text: {
    textAlign: "left",
    fontFamily: "Gilroy-Bold",
    fontSize: 17,
    color: colors.Primary_Dark,
  },
  email: {
    textAlign: "left",
    fontFamily: "Gilroy-Medium",
    color: colors.secondary,
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabView: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  arrow2: {
    position: "absolute",
    left: 20,
    top: 15,
  },
  HeaderText: {
    color: colors.Primary_Dark,
    fontSize: 15,
    lineHeight: 23,
    fontFamily: "Gilroy-Bold",
    fontWeight: "bold",
  },
});

export default function Setting({ navigation }) {
  const User = useSelector((state) => state.USER);

  const Loggedin = () => {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <View style={styles.profile}>
            <View style={styles.round}>
              <Gravatar
                options={{
                  email: User.email,
                  parameters: { size: "200", d: "mm" },
                  secure: true,
                }}
                style={styles.avatar}
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>{User.displayName}</Text>
              <Text style={styles.email}>{User.email}</Text>
            </View>
            <View style={styles.icon}>
              <MaterialIcons name="edit" size={30} color={colors.Sorbus} />
            </View>
          </View>

          <View style={styles.tabView}>
            <SettinItem
              text="Contact"
              onPress={() => navigation.navigate("ContactUs")}
              name="ios-chatbubbles"
            />

            <SettinItem
              text="Notification"
              onPress={() => navigation.navigate("Notifications")}
              name="ios-notifications"
            />

            <SettinItem
              text="About"
              onPress={() => navigation.navigate("About")}
              name="md-settings"
            />

            <SettinItem
              text="Feedback"
              onPress={() => navigation.navigate("Feedback")}
              name="md-help"
            />

            <SettinItem
              text="Log Out"
              onPress={signOutUser}
              name="ios-log-out"
            />
          </View>
        </View>
      </View>
    );
  };

  const Anonymous = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.profile}>
          <AntDesign
            name="user"
            size={44}
            color={colors.Primary_Dark}
            style={styles.arrow2}
          />
        </View>

        <View style={styles.tabView}>
          <SettinItem
            text="Sign Up"
            onPress={() => navigation.navigate("Signup")}
            name="md-person"
          />

          <SettinItem
            text="Log In"
            onPress={() => navigation.navigate("Login")}
            name="ios-log-in"
          />
        </View>
      </View>
    );
  };

  const signOutUser = () => {
    Fire.auth()
      .signOut()
      .then(function () {
        navigation.navigate("Home");
      })
      .catch(function (error) {
        console.log("ERR", error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerbackcolor}>
        <MaterialIcons
          name="keyboard-backspace"
          size={34}
          color="black"
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.HeaderText}> Back to my Whims </Text>
      </SafeAreaView>

      <ScrollView>
        {User.isAnonymous === true ? Anonymous() : Loggedin()}
      </ScrollView>
    </View>
  );
}
