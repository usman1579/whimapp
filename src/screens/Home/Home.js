import React, { useState, useEffect, useRef } from "react"; // eslint-disable-line
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import ConfettiCannon from "react-native-confetti-cannon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";

import Fire from "../../../Firebase";
import { Gravatar } from "react-native-gravatar";
import {
  USERDATA,
  FETCHWHIMLIST,
  EditWhimItem,
  CurrentWhimData,
} from "../../redux/reducer";
import WhimLogo from "../../../assets/whim.png";
import Item from "./Item";
import { NotifierRoot, Notifier, Easing } from "react-native-notifier";
import { useSelector, useDispatch } from "react-redux";

import {
  White,
  Bunting,
  ShipCove,
  Sorbus,
  Crusta,
  Primary_Dark,
} from "../../Token/token";

import { Container } from "../../CommonStyle/commonStyle";
import * as colors from "../../Token/token";

const styles = StyleSheet.create({
  container: Container,
  containerLoading: {
    flex: 1,
    backgroundColor: colors.Crusta,
    justifyContent: "center",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  greetingmain: {
    height: hp("8%"),
    width: wp("90%"),
    flexDirection: "row",
    margin: 10,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  greetingText: {
    flex: 5,
    justifyContent: "center",
  },
  greeting1: {
    fontFamily: "Gilroy-Bold",
    color: Bunting,
    letterSpacing: 0.02,
    alignItems: "flex-end",
    fontSize: hp("3%"),
    lineHeight: 29,
  },
  greeting2: {
    color: ShipCove,
    fontFamily: "Gilroy-Medium",
    fontSize: 16,
    letterSpacing: 0.02,
  },
  imageouter: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: hp("100%"),
    backgroundColor: "lightgrey",
  },
  floatingbutton: {
    height: 65,
    width: 65,
    borderRadius: 65,
    backgroundColor: Sorbus,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: hp("3%"),
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  text: {
    fontSize: hp("4%"),
    color: White,
    fontWeight: "normal",
  },
  price: {
    letterSpacing: 0.4,
    color: Bunting,
    fontSize: hp("2.6%"),
    fontFamily: "Gilroy-Bold",
  },
  profileimage: {
    height: hp("10%"),
    width: wp("25%"),
    marginHorizontal: 20,
  },
  emptylist: {
    textAlign: "center",
    fontSize: 20,
    color: "lightgrey",
    margin: 20,
  },

  mainshow: {
    height: hp("35%"),
    width: wp("80%"),
    backgroundColor: White,
    borderRadius: 6,
  },
  maintext: {
    fontFamily: "Gilroy-Bold",
    color: "black",
    fontSize: hp("2.5%"),
    margin: 30,
    fontWeight: "600",
  },
  maintext2: {
    color: ShipCove,
    fontSize: 15,
    marginHorizontal: 30,
  },
  mainbutton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: Crusta,
    alignSelf: "center",
    height: 50,
    width: wp("50%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.7,
  },
  buttontext: {
    color: White,
    fontWeight: "bold",
    fontFamily: "Gilroy-Bold",
  },
  modal2: {
    height: hp("45%"),
    width: wp("80%"),
    backgroundColor: White,
    borderRadius: 10,
    overflow: "hidden",
  },
  modal2image: {
    flex: 3,
    backgroundColor: "lightgrey",
  },
  modimage: {
    height: "100%",
    width: "100%",
  },
  mod2view: {
    flex: 1,
    margin: 15,
  },
  mod2name: {
    fontFamily: "Gilroy-Medium",
    fontSize: hp("2%"),
    color: Primary_Dark,
  },
  mod2price: {
    fontFamily: "Gilroy-Bold",
    fontSize: hp("3%"),
    color: Primary_Dark,
    marginVertical: hp("1%"),
  },
  mod2days: {
    color: "#8792A8",
    fontSize: hp("1.5%"),
    fontFamily: "Gilroy-Medium",
  },

  mod3view: {
    flex: 2,
    margin: 10,
    borderTopColor: "grey",
    borderTopWidth: 0.5,
  },

  mod3text: {
    margin: hp("2%"),
    fontFamily: "Gilroy-Bold",
    fontSize: hp("2%"),
  },

  mod3buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  mod3nah: {
    height: hp("7%"),
    width: wp("30%"),
    borderRadius: hp("1%"),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Crusta,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 1,
    shadowOpacity: 0.4,
  },

  buttonnah: {
    color: Crusta,
    fontFamily: "Gilroy-Bold",
    fontSize: hp("2%"),
  },

  buttonyes: {
    height: hp("7%"),
    width: wp("30%"),
    backgroundColor: Crusta,
    borderRadius: hp("1%"),
    justifyContent: "center",
    alignItems: "center",
  },

  yestext: {
    color: White,
    fontFamily: "Gilroy-Bold",
    fontSize: hp("2%"),
  },

  roundAnony: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 40,
  },
});

export default function Home({ navigation }) {
  const [isRefreshing, setisRefreshing] = useState(false); // eslint-disable-line
  const [show, setshow] = useState(false);
  const [show2, setshow2] = useState(false);
  const [currentWhim, setCurrentWhim] = useState("");
  const dispatch = useDispatch();

  const User = useSelector((state) => state.USER);
  const Whim = useSelector((state) => state.WhimList);
  const notifierRef = useRef();

  useEffect(() => {
    Fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch(USERDATA(user));
        dispatch(FETCHWHIMLIST(user.uid));
        navigation.navigate("Home");
      } else {
        Fire.auth()
          .signInAnonymously()
          .then((res) => {
            const ID = res.user.uid;
            dispatch(USERDATA(res));

            Fire.firestore()
              .collection("USERS")
              .doc(ID)
              .set({
                Name: "Anonymous",
                ID: ID,
                Notification: true,
              })
              .then(() => {
                navigation.navigate("Home");
              })
              .catch((err) => {
                Notifier.showNotification({
                  title: "Error",
                  description: err.message,
                  duration: 0,
                  showAnimationDuration: 800,
                  showEasing: Easing.bounce,
                  onHidden: () => console.log("Hidden"),
                  onPress: () => console.log("Press"),
                  hideOnPress: true,
                });
              });
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;

            Notifier.showNotification({
              title: "Error",
              description: errorMessage,
            });
          })
          .catch(function (error) {
            Notifier.showNotification({
              title: "Error" + error.code,
              description: error.message,

              duration: 0,
              showAnimationDuration: 800,
              showEasing: Easing.bounce,
              onHidden: () => console.log("Hidden"),
              onPress: () => console.log("Press"),
              hideOnPress: true,
            });
          });
      }
    });
  }, []);

  const onRefresh = async () => {
    await setisRefreshing(true); // true isRefreshing flag for enable pull to refresh indicator
    await dispatch(FETCHWHIMLIST(User.uid));
    await setisRefreshing(false);
  };

  const handleClose = () => {
    setshow(false);
  };

  /* const handleClose2 = () => {
    setshow2(false);
  }; */

  const CloseModal = () => {
    setshow2(true);
  };

  const completed = (item) => {
    setshow(true);
    setCurrentWhim(item);
  };

  const NewWhim = () => {
    dispatch(EditWhimItem(false));
    dispatch(
      CurrentWhimData({
        id: "",
        name: "",
        price: "",
        photo: "",
        days: "",
        timeStamp: "",
      })
    );
    navigation.navigate("NewWhim");
  };

  if (User.uid === "") {
    return (
      <SafeAreaView style={styles.containerLoading}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.White} />
        </View>
        <NotifierRoot ref={notifierRef} />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.profileimage}
          source={WhimLogo}
          resizeMode="contain"
        />

        <View style={styles.greetingmain}>
          <View style={styles.greetingText}>
            <Text style={styles.greeting1}>
              Good Morning,{" "}
              {User.isAnonymous === true ? null : User.displayName}
            </Text>
            <Text style={styles.greeting2}>
              You have {Whim.length} whim added
            </Text>
          </View>

          {User.isAnonymous === true ? (
            <TouchableOpacity
              style={styles.roundAnony}
              onPress={() => navigation.navigate("Setting")}
            >
              <Feather name="user" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.imageouter}
              onPress={() => navigation.navigate("Setting")}
            >
              <Gravatar
                options={{
                  email: User.email,
                  parameters: { size: "100", d: "mm" },
                  secure: true,
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* whims */}
        {Whim.length < 1 ? (
          <Text style={styles.emptylist}>Press + to add a whim </Text>
        ) : (
          <FlatList
            data={Whim}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            renderItem={({ item }) => (
              <Item item={item} completed={completed} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}

        <TouchableOpacity style={styles.floatingbutton} onPress={NewWhim}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>

        <Modal
          isVisible={show}
          onBackdropPress={handleClose}
          style={{ alignItems: "center", position: "relative" }}
        >
          {show2 === false ? (
            <>
              <View style={styles.mainshow}>
                <Text style={styles.maintext}>
                  {"Yeh! You've waited long enough"}
                </Text>

                <Text style={styles.maintext2}>
                  {
                    "You are ready to decide whether to buy it or not. Be responsive with your decision."
                  }
                </Text>

                <TouchableOpacity
                  style={styles.mainbutton}
                  onPress={CloseModal}
                >
                  <Text style={styles.buttontext}>Got it</Text>
                </TouchableOpacity>
              </View>
              <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
            </>
          ) : (
            <View style={styles.modal2}>
              <View style={styles.modal2image}>
                <Image
                  style={styles.modimage}
                  source={{ uri: currentWhim.photo }}
                />
              </View>

              <View style={styles.mod2view}>
                <Text style={styles.mod2name}>{currentWhim.name}</Text>

                <Text style={styles.mod2price}>
                  ${currentWhim.price}{" "}
                  <Text style={styles.mod2days}>
                    | {currentWhim.days} Days waited
                  </Text>
                </Text>
              </View>

              <View style={styles.mod3view}>
                <Text style={styles.mod3text}>
                  Would you like to purchase it?
                </Text>

                <View style={styles.mod3buttons}>
                  <TouchableOpacity style={styles.mod3nah}>
                    <Text style={styles.buttonnah}>Nah</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.buttonyes}>
                    <Text style={styles.yestext}>Yes, Got it</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Modal>
        <NotifierRoot ref={notifierRef} />
      </SafeAreaView>
    );
  }
}
