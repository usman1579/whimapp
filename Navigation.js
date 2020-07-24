import React from "react";
import { NotifierWrapper } from "react-native-notifier";
import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./src/auth/Login/Login";
import Signup from "./src/auth/Signup/Signup";
import Home from "./src/screens/Home/Home";
import NewWhim from "./src/screens/NewWhim/NewWhim";
import Cost from "./src/screens/Cost/Cost";
import Days from "./src/screens/Days/Days";
import Confirmation from "./src/screens/Confirmation/Confirmation";
import WhimDetail from "./src/screens/WhimDetail/WhimDetail";
import Setting from "./src/screens/Setting/Setting";
import ContactUs from "./src/screens/Setting/ContactUs";
import Notifications from "./src/screens/Setting/Notifications";
import About from "./src/screens/Setting/About";
import Feedback from "./src/screens/Setting/Feedback";

const Stack = createStackNavigator();

function Navigation() {
  let [fontsLoaded] = useFonts({
    "Gilroy-Bold": require("./assets/Fonts/Gilroy-Bold.otf"),
    "Gilroy-Medium": require("./assets/Fonts/Gilroy-Medium.otf"),
    "Gilroy-SemiBold": require("./assets/Fonts/Gilroy-SemiBold.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NotifierWrapper>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewWhim"
            component={NewWhim}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cost"
            component={Cost}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Days"
            component={Days}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Confirmation"
            component={Confirmation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WhimDetail"
            component={WhimDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Feedback" component={Feedback} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotifierWrapper>
  );
}

export default Navigation;
