import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as colors from "../Token/token";

let styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
  },
  main: {
    flex: 1,
    alignSelf: "flex-end",
  },
  row: {
    flexDirection: "row",
  },
});

const keyStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: hp("10%"),
    backgroundColor: colors.White,
  },
  bd: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  border: {
    borderColor: colors.White,
  },
  mainText: {
    fontSize: 20,
    color: colors.Bunting,
    fontFamily: "Gilroy-Bold",
  },
  otherText: {
    fontSize: 20,
    color: colors.Bunting,
  },
  bg_d2d5dc: {
    backgroundColor: colors.White,
  },
  bgLessL: {
    backgroundColor: colors.White,
  },
  dot: {
    height: 30,
    fontSize: 30,
    lineHeight: 25,
  },
});

const numberKeys = [
  [
    { mainText: "1", otherText: "" },
    { mainText: "2", otherText: "ABC" },
    { mainText: "3", otherText: "DEF" },
  ],
  [
    { mainText: "4", otherText: "GHI" },
    { mainText: "5", otherText: "JKL" },
    { mainText: "6", otherText: "MNO" },
  ],
  [
    { mainText: "7", otherText: "PQRS" },
    { mainText: "8", otherText: "TUV" },
    { mainText: "9", otherText: "WXYZ" },
  ],
];

class Keyboard extends Component {
  constructor(props) {
    super(props);
  }

  _clearAll() {
    this.props.onClear();
  }

  _onPress(key) {
    if (key === "") {
      return;

      // delete key
    } else if (key === "del") {
      this.props.onDelete();

      // number key
    } else {
      this.props.onKeyPress(key);
    }
  }

  _renderOtherText(key) {
    if (this.props.disableOtherText !== true) {
      return <Text style={keyStyle.otherText}>{key.otherText}</Text>;
    }

    return null;
  }

  _disableBorder() {
    if (this.props.disableBorder !== true) {
      return keyStyle.bd;
    }

    return keyStyle.border;
  }

  _disableClearButtonBackground() {
    if (this.props.disableClearButtonBackground !== true) {
      return keyStyle.bg_d2d5dc;
    }

    return keyStyle.bgLess;
  }

  _clearBtnUnderlayColor() {
    if (this.props.disableClearButtonBackground !== true) {
      return "#ffffff";
    }

    return "#d2d5dc";
  }

  _renderKey(key, index) {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.6}
        style={keyStyle.wrapper}
        onPress={this._onPress.bind(this, key.mainText)}
      >
        <View style={[keyStyle.bd, this._disableBorder()]}>
          <Text style={keyStyle.mainText}>{key.mainText}</Text>
          {/* {this._renderOtherText(key)} */}
        </View>
      </TouchableOpacity>
    );
  }

  _renderNumberKeys() {
    return numberKeys.map((group, groupIndex) => {
      return (
        <View key={groupIndex} style={styles.row}>
          {group.map(this._renderKey.bind(this))}
        </View>
      );
    });
  }

  _isDecimalPad() {
    return this.props.keyboardType === "decimal-pad";
  }

  _renderDotKey() {
    if (this.props.disableDot !== true) {
      let dotNode = null,
        dotText = "";
      if (this._isDecimalPad()) {
        dotText = ".";
        dotNode = <Text style={[keyStyle.mainText, keyStyle.dot]}>.</Text>;
      }
      return (
        <TouchableHighlight
          underlayColor="#ffffff"
          activeOpacity={1}
          style={[keyStyle.wrapper, keyStyle.bg_d2d5dc]}
          onPress={this._onPress.bind(this, dotText)}
        >
          <View style={[keyStyle.bd, this._disableBorder()]}>{dotNode}</View>
        </TouchableHighlight>
      );
    }

    return (
      <TouchableHighlight style={keyStyle.wrapper}>
        <View />
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.main}>
          {this._renderNumberKeys()}

          <View style={styles.row}>
            {this._renderDotKey()}

            <TouchableHighlight
              underlayColor={"#d2d5dc"}
              activeOpacity={1}
              style={keyStyle.wrapper}
              onPress={this._onPress.bind(this, "0")}
            >
              <View style={[keyStyle.bd, this._disableBorder()]}>
                <Text style={keyStyle.mainText}>0</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={this._clearBtnUnderlayColor()}
              activeOpacity={0.7}
              style={[keyStyle.wrapper, this._disableClearButtonBackground()]}
              onPress={this._onPress.bind(this, "del")}
              onLongPress={this._clearAll.bind(this)}
            >
              <View style={[keyStyle.bd, this._disableBorder()]}>
                {/* <Image source={require('./images/icon_delete.png')} /> */}
                <MaterialCommunityIcons
                  name="backspace"
                  size={24}
                  color="#7D8DA6"
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

Keyboard.propTypes = {
  keyboardType: PropTypes.oneOf(["number-pad", "decimal-pad"]),
  onKeyPress: PropTypes.func,
  onDelete: PropTypes.func,
  onClear: PropTypes.func,
};

Keyboard.defaultProps = {
  keyboardType: "number-pad",
  onKeyPress: () => {},
  onDelete: () => {},
  onClear: () => {},
};

export default Keyboard;
