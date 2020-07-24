import React from "react";
import styled from "styled-components";
import { StyleSheet, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as colors from "../../Token/token";
import WhimLogo from "../../../assets/whim.png";

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.White};
  align-items: center;
`;

const Logo = styled(Image)`
  height: 100pct;
  width: 200pct;
`;

export default function About({ navigation }) {
  return (
    <Container>
      <Logo source={WhimLogo} resizeMode="contain" />

      <Text style={styles.text1}>
        Help you be more reasonable about your caprices also knows as whims :)
      </Text>

      <Text style={styles.text2}>Made in Barcelona By @davesnx</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontWeight: "600",
    color: colors.Primary_Dark,
    fontSize: 15,
    lineHeight: 23,
    margin: 30,
  },
  text2: {
    fontWeight: "500",
    color: colors.secondary,
    fontSize: 15,
    lineHeight: 23,
  },
});
