import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import Button from "../../components/Button";
import Keyboard from "../../components/Keyboard";
import { Foundation } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as colors from "../../Token/token";
import { Container } from "../../CommonStyle/commonStyle";
import { useSelector } from "react-redux";

let model = {
  _keys: [],

  _listeners: [],

  addKey(key) {
    this._keys.push(key);
    this._notify();
  },

  delKey() {
    this._keys.pop();
    this._notify();
  },

  clearAll() {
    this._keys = [];
    this._notify();
  },

  getKeys() {
    return this._keys;
  },

  onChange(listener) {
    if (typeof listener === "function") {
      this._listeners.push(listener);
    }
  },

  _notify() {
    this._listeners.forEach((listner) => {
      listner(this);
    });
  },
};

const styles = StyleSheet.create({
  container: Container,
  costtext: {
    color: colors.White,
    fontFamily: "Gilroy-Bold",
    fontSize: hp("5%"),
  },
  Keyboard: {
    flex: 1,
    position: "relative",
    alignItems: "center",
  },
  Button: {
    position: "absolute",
    bottom: hp("2%"),
    flex: 1,
  },
  text: {
    flex: 0.8,
    backgroundColor: colors.Sorbus,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  HeaderTitleView: {
    alignItems: "center",
    flex: 1,
  },
  HeaderTitle: {
    color: colors.White,
    fontWeight: "bold",
    fontFamily: "Gilroy-Bold",
    fontSize: 20,
  },
});

export default function Cost({ navigation, route }) {
  const { name, photo } = route.params;
  const [text, settext] = useState("0.00");
  const EditWhim = useSelector((state) => state.EditWhim);
  const CurrentItem = useSelector((state) => state.currentWhim);

  useEffect(() => {
    model.onChange((m) => {
      settext(m.getKeys().join(""));
    });
    EditDetail();
  }, []);

  const EditDetail = () => {
    if (EditWhim) {
      settext(CurrentItem.price);
    }
  };

  const _handleClear = () => {
    model.clearAll();
  };

  const _handleDelete = () => {
    model.delKey();
  };

  const _handleKeyPress = (key) => {
    model.addKey(key);
  };

  const onPress = () => {
    navigation.navigate("Days", { cost: text, name: name, photo: photo });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#E76A33" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />

        <View style={styles.HeaderTitleView}>
          <Text style={styles.HeaderTitle}>How much does it cost?</Text>
        </View>
      </Appbar.Header>

      <View style={styles.text}>
        <Foundation
          style={{ marginTop: -20 }}
          name="dollar"
          size={30}
          color="#F2B49A"
        />
        <Text style={styles.costtext}> {text}</Text>
      </View>

      <View style={styles.Keyboard}>
        <Keyboard
          keyboardType="decimal-pad"
          onClear={_handleClear}
          onDelete={_handleDelete}
          onKeyPress={_handleKeyPress}
        />

        <View style={styles.Button}>
          <Button text="Continue" onPress={onPress} />
        </View>
      </View>
    </View>
  );
}
