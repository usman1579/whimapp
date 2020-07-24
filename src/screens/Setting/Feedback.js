import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import * as colors from "../../Token/token";
import styled from "styled-components";

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.White};
`;

export default function Feedback() {
  return (
    <Container>
      <WebView source={{ uri: "https://davesnx.typeform.com/to/p3PwLv" }} />
    </Container>
  );
}
