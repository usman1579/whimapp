import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import * as colors from "../../Token/token";
import Slider from "../../components/Slider/index";
import Button from "../../components/Button";

import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Sorbus,
  },
  Days: {
    color: colors.White,
    fontSize: 56,
    lineHeight: 56,
    fontWeight: "bold",
    fontFamily: "Gilroy-Bold",
    textAlign: "left",
  },
  DaysView: {
    marginTop: hp("8%"),
    marginBottom: 50,
    marginHorizontal: 20,
    alignItems: "flex-start",
  },
  Heading: {
    color: colors.White,
    textAlign: "center",
  },
  main: {
    backgroundColor: colors.Sorbus,
    flex: 1,
  },
  HeaderView: {
    alignItems: "center",
    flex: 1,
  },
  HeaderTitle: {
    color: colors.White,
    fontWeight: "bold",
    fontFamily: "Gilroy-Bold",
    fontSize: 20,
  },
  ButtonView: {
    position: "absolute",
    bottom: hp("3%"),
    alignSelf: "center",
  },
});

export default function Cost({ navigation, route }) {
  const [Value, setValue] = useState(0);
  const { name, photo, cost } = route.params;
  const EditWhim = useSelector((state) => state.EditWhim);
  const CurrentItem = useSelector((state) => state.currentWhim);

  useEffect(() => {
    EditDetail();
  }, []);

  const EditDetail = () => {
    if (EditWhim) {
      setValue(CurrentItem.days);
    }
  };

  const onPress = () => {
    navigation.navigate("Confirmation", {
      day: Value,
      name: name,
      photo: photo,
      cost: cost,
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.accent }}>
        <Appbar.BackAction
          color={colors.White}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title="How long to wait?"
          titleStyle={styles.HeaderTitle}
        />
      </Appbar.Header>

      <View style={styles.main}>
        <Text style={styles.Heading}>
          Protect yourself from impulsive shopping
        </Text>

        <View style={styles.DaysView}>
          <Text style={styles.Days}>{Value} Days</Text>
        </View>

        <Slider value={Value} onValueChange={setValue} multiplicity={1} />
      </View>

      <View style={styles.ButtonView}>
        <Button
          style={{ backgroundColor: colors.White }}
          style1={{ color: colors.accent }}
          text="Continue"
          onPress={onPress}
        />
      </View>
    </View>
  );
}
