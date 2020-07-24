import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Primary_Dark, Bottomline, Border } from "../../Token/token";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  outer: {
    height: 65,
    position: "relative",
    flexDirection: "row",
    marginTop: 10,
  },
  outerViewIcon: {
    height: 36,
    width: 36,
    borderWidth: 1.5,
    borderRadius: 36,
    borderColor: Border,
    justifyContent: "center",
    alignItems: "center",
  },
  texttab: {
    color: Primary_Dark,
    fontSize: 15,
    fontFamily: "Gilroy-Bold",
    position: "absolute",
    left: 80,
    top: 15,
  },
  arrow: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  bottomline: {
    backgroundColor: Bottomline,
    height: 1,
    marginHorizontal: 10,
    marginTop: -10,
  },
});

const SettingItem = (props) => {
  return (
    <>
      <TouchableOpacity
        style={styles.outer}
        activeOpacity={1}
        onPress={props.onPress}
      >
        <View style={styles.outerViewIcon}>
          <Ionicons name={props.name} size={20} color={Primary_Dark} />
        </View>
        <Text style={styles.texttab}>{props.text}</Text>
        <Ionicons
          name="ios-arrow-forward"
          size={24}
          color={Primary_Dark}
          style={styles.arrow}
        />
      </TouchableOpacity>
      <View style={styles.bottomline}></View>
    </>
  );
};

export default SettingItem;
