import React from "react";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import * as colors from "../../Token/token";

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.White};
`;

export default function ContactSupport({ navigation }) {
  return (
    <Container>
      <WebView source={{ uri: "https://davesnx.typeform.com/to/p3PwLv" }} />
    </Container>
  );
}
