import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import * as colors from "../Token/token";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    height: 50,
    width: wp("80%"),
    borderRadius: 6,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Buttontext: {
    color: colors.White,
    fontWeight: "bold",
  },
});

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.Button, props.style]}
    >
      <Text style={[styles.Buttontext, props.style1]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
