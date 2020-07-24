import React, { useState, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Appbar, Checkbox, Colors } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { id16 } from "@jsweb/randkey";
import { NotifierRoot } from "react-native-notifier";
import { Notifier, Easing } from "react-native-notifier";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as colors from "../../Token/token";
import Button from "../../components/Button";
import Fire from "../../../Firebase";
import { Container } from "../../CommonStyle/commonStyle";
import { registerForPushNotificationsAsync } from "../../Notification/Notification";

import {
  FETCHWHIMLIST,
  EditWhimItem,
  CurrentWhimData,
} from "../../redux/reducer";
import { useSelector, useDispatch } from "react-redux";
const styles = StyleSheet.create({
  container: Container,
  box: {
    height: 56,
    width: "90%",
    backgroundColor: colors.GhostWhite,
    borderRadius: 4,
    marginVertical: 15,
    justifyContent: "center",
  },
  Text1: {
    fontSize: 11,
    fontFamily: "Gilroy-Medium",
    color: colors.ShipCove,
    marginHorizontal: 10,
  },
  Text2: {
    color: colors.Bunting,
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: "Gilroy-Bold",
    marginTop: 5,
  },
  Button: {
    position: "absolute",
    bottom: hp("2%"),
    flex: 1,
    alignSelf: "center",
  },
  Modal: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colors.Crusta,
    marginBottom: -20,
    zIndex: 1000,
    shadowOpacity: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  Modalbox: {
    height: hp("20%"),
    width: wp("70%"),
    backgroundColor: colors.White,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  ModalText: {
    textAlign: "center",
    fontFamily: "Gilroy-Bold",
    fontWeight: "bold",
    fontSize: 17,
  },
  checkboxouter: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxtext: {
    color: colors.Black,
    fontFamily: "Gilroy-Medium",
    fontSize: 16,
    lineHeight: 16,
    marginHorizontal: 15,
  },
  notificationtext: {
    color: colors.secondary,
    fontFamily: "Gilroy-Medium",
    lineHeight: 19,
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 20,
  },
  Headertext: {
    color: colors.Black,
    fontWeight: "bold",
    fontFamily: "Gilroy-Bold",
    fontSize: 20,
  },
  headerView: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.White,
  },
  notifybox: {
    width: "90%",
    flexDirection: "column",
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
  Header: {
    backgroundColor: "transparent",
  },
});

function isURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(str);
}

export default function Confirmation({ navigation, route }) {
  const ID = Fire.auth().currentUser.uid;
  const [check, setcheck] = useState(true);
  const [check2, setcheck2] = useState(true);
  const [show, setshow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { name, cost, photo, day } = route.params;
  const notifierRef = useRef();
  const dispatch = useDispatch();

  const User = useSelector((state) => state.USER);
  const EditWhim = useSelector((state) => state.EditWhim);
  const CurrentItem = useSelector((state) => state.currentWhim);

  const EditDetail = async () => {
    if (EditWhim) {
      const res = isURL(photo);

      if (res) {
        setLoading(true);
        await Fire.firestore()
          .collection("USERS")
          .doc(ID)
          .collection("Whim")
          .doc(CurrentItem.id)
          .update({
            WhimName: name,
            WhimDays: day,
            WhimPhoto: photo,
            WhimPrice: cost,
            WhimtimeStamp: new Date(),
            PushNotification: check,
            sentEmail: check2,
          })
          .then(() => {
            setLoading(false);
            setshow(true);
            dispatch(CurrentWhimData(""));
            dispatch(EditWhimItem(false));
          })
          .catch((err) => {
            setLoading(false);
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
      } else {
        setLoading(true);
        const downloadURL = await uploadImage();
        await Fire.firestore()
          .collection("USERS")
          .doc(ID)
          .collection("Whim")
          .doc(CurrentItem.id)
          .update({
            WhimName: name,
            WhimDays: day,
            WhimPhoto: downloadURL,
            WhimPrice: cost,
            WhimtimeStamp: new Date(),
            PushNotification: check,
            sentEmail: check2,
          })
          .then(() => {
            setLoading(false);
            setshow(true);
            dispatch(CurrentWhimData(""));
            dispatch(EditWhimItem(false));
          })
          .catch((err) => {
            setLoading(false);
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
      }
    } else {
      handleOpen();
    }
  };

  const uploadImage = async () => {
    const response = await fetch(photo);
    const blob = await response.blob();
    var uploadTask = await Fire.storage()
      .ref()
      .child("/Images/" + ID + "/whim/" + id16())
      .put(blob);
    const downloadURL = await uploadTask.ref.getDownloadURL();
    return downloadURL;
  };

  const handleOpen = async () => {
    registerForPushNotificationsAsync();
    setLoading(true);
    const downloadURL = await uploadImage();
    await Fire.firestore()
      .collection("USERS")
      .doc(ID)
      .collection("Whim")
      .add({
        WhimName: name,
        WhimDays: day,
        WhimPhoto: downloadURL,
        WhimPrice: cost,
        WhimtimeStamp: new Date(),
        PushNotification: check,
        sentEmail: check2,
        notificationStatus: "Pending",
      })
      .then(() => {
        setLoading(false);
        setshow(true);
      })
      .catch((err) => {
        setLoading(false);
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
  };

  const handleClose = async () => {
    await setshow(false);
    await dispatch(FETCHWHIMLIST(User.uid));
    await navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.Header}>
        <Appbar.BackAction color="black" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Create New Whim"
          titleStyle={styles.Headertext}
        />
      </Appbar.Header>

      {Loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}

      <Modal
        isVisible={show}
        onBackdropPress={handleClose}
        style={{ alignItems: "center" }}
      >
        <View style={styles.Modal}>
          <Entypo name="check" size={30} color={Colors.white} />
        </View>
        <View style={styles.Modalbox}>
          <Text style={styles.ModalText}>
            New Whim {"\n"}
            successfully created
          </Text>
        </View>
      </Modal>

      <ScrollView>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.box}>
            {/* <Text>{random}</Text> */}
            <Text style={styles.Text1}>What are you saving for?</Text>
            <Text style={styles.Text2}>{name}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.Text1}>How much does it cost?</Text>
            <Text style={styles.Text2}>$ {cost}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.Text1}>How long to wait?</Text>
            <Text style={styles.Text2}>{day} days</Text>
          </View>

          <View style={styles.notifybox}>
            <Text style={styles.notificationtext}>Notification</Text>

            <View style={styles.checkboxouter}>
              <Checkbox
                status={check ? "checked" : "unchecked"}
                color={colors.accent}
                uncheckedColor={colors.accent}
                onPress={() => setcheck(!check)}
              />

              <Text style={styles.checkboxtext}>
                Recieve push notofocations
              </Text>
            </View>

            <View style={styles.checkboxouter}>
              <Checkbox
                status={check2 ? "checked" : "unchecked"}
                color={colors.accent}
                uncheckedColor={colors.accent}
                onPress={() => setcheck2(!check2)}
              />

              <Text style={styles.checkboxtext}>
                Recieve e-mail notifications
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.Button}>
        <Button text="Continue" onPress={EditDetail} />
      </View>

      <NotifierRoot ref={notifierRef} />
    </View>
  );
}
