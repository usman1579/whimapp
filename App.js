import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Navigation from "./Navigation";
import { Provider as StoreProvider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </StoreProvider>
  );
}
