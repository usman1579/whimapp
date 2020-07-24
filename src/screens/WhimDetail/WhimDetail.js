import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Share,
} from "react-native";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import { Appbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { NotifierRoot } from "react-native-notifier";
import { Notifier, Easing } from "react-native-notifier";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { progressCustomStyles, barWidth } from "../../Constants/Constants";
import Fire from "../../../Firebase";
import * as colors from "../../Token/token";
import { useDispatch } from "react-redux";
import { CurrentWhimData, EditWhimItem } from "../../redux/reducer";

const styles = StyleSheet.create({
  editbutton: {
    height: hp("8%"),
    width: wp("40%"),
    borderRadius: 10,
    backgroundColor: colors.White,
    borderWidth: 2,
    borderColor: colors.HawkesBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  editText: {
    fontFamily: "Gilroy-Bold",
    fontSize: hp("2%"),
    color: colors.Black,
  },
  sharebutton: {
    height: hp("8%"),
    width: wp("40%"),
    borderRadius: 10,
    backgroundColor: colors.Crusta,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  shareText: {
    fontFamily: "Gilroy-Bold",
    fontSize: hp("2%"),
    color: colors.White,
  },
  ImageBackground: {
    height: hp("30%"),
    width: wp("90%"),
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "lightgrey",
    marginVertical: 20,
    position: "relative",
  },
  ImageBackgroundTran: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  ImageBackgroundText: {
    color: colors.White,
    fontWeight: "bold",
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: hp("3%"),
    fontFamily: "Gilroy-Bold",
    lineHeight: hp("3%"),
    letterSpacing: 0.4,
  },
  progressBarView: {
    alignSelf: "flex-start",
  },
  progressText: {
    fontFamily: "Gilroy-Medium",
    fontSize: 14,
    color: colors.ShipCove,
    textAlign: "left",
    marginLeft: wp("6%"),
  },
  progressDays: {
    fontFamily: "Gilroy-Bold",
    fontSize: hp("5%"),
    color: colors.Bunting,
    textAlign: "left",
    marginLeft: wp("6%"),
    marginVertical: 10,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  progressBackground: {
    marginLeft: wp("6%"),
    alignSelf: "center",
    backgroundColor: colors.Solitude,
    borderRadius: 6,
    borderColor: colors.Solitude,
  },
  progressBottomText: {
    fontFamily: "Gilroy-Medium",
    fontSize: 14,
    color: colors.ShipCove,
    textAlign: "left",
    marginHorizontal: wp("6%"),
    marginVertical: 10,
  },
  bottomButton: {
    height: hp("8%"),
    width: "90%",
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    marginHorizontal: 10,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  HeaderView: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.White,
  },
  HeaderTitle: {
    color: colors.Black,
    fontWeight: "bold",
    fontFamily: "Gilroy-Bold",
    fontSize: 20,
  },
  MainView: {
    flex: 1,
    alignItems: "center",
  },
  deleteView: {
    position: "absolute",
    bottom: 10,
    alignItems: "center",
  },
  deletebutton: {
    height: hp("7%"),
    width: wp("95%"),
    backgroundColor: colors.White,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  deletetext: {
    fontFamily: "Gilroy-Bold",
    fontWeight: "bold",
    fontSize: hp("3%"),
    color: colors.Error,
    marginHorizontal: hp("6%"),
  },
  cancelbutton: {
    height: hp("7%"),
    width: wp("95%"),
    backgroundColor: colors.White,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  cancelText: {
    fontWeight: "bold",
    fontSize: hp("3%"),
    color: colors.Bunting,
    marginHorizontal: hp("6%"),
  },
  Header: {
    backgroundColor: "transparent",
  },
});

export default function WhimDetail({ navigation, route }) {
  const [progress, setProgress] = useState(1); // eslint-disable-line
  const [show, setShow] = useState(false);
  const notifierRef = useRef();
  const dispatch = useDispatch();
  const User = Fire.auth().currentUser;
  const { item } = route.params;

  useEffect(() => {
    var createdtime = new Date(item.timeStamp.seconds * 1000);
    var current_time = new Date().getTime();
    var daysdifference = current_time - createdtime;
    var days = daysdifference / 86400000;
    var days1 = days.toString();
    var total_days = days1.split(".")[0];
    if (total_days > item.days) {
      setProgress(100);
    } else {
      var prog = (total_days * 100) / item.days;
      setProgress(prog);
    }
  }, []);

  const handleModalOn = () => {
    setShow(true);
  };

  const handleModaloff = () => {
    setShow(false);
  };

  // Delete whim code
  const deleteWhim = () => {
    Fire.firestore()
      .collection("USERS")
      .doc(User.uid)
      .collection("Whim")
      .doc(item.id)
      .delete()
      .then(function () {
        setShow(false);
        navigation.navigate("Home");
      })
      .catch(function (err) {
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

  const Whim_Detail = async () => {
    await dispatch(CurrentWhimData(item));
    await dispatch(EditWhimItem(true));
    await navigation.navigate("NewWhim");
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Welcome to WHIM Share",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.Header}>
        <Appbar.BackAction
          color={colors.Black}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title={item.name} titleStyle={styles.HeaderTitle} />
        <Appbar.Action icon="dots-horizontal" onPress={handleModalOn} />
      </Appbar.Header>

      <Modal isVisible={show} style={{ alignItems: "center" }}>
        <View style={styles.deleteView}>
          <TouchableOpacity style={styles.deletebutton} onPress={deleteWhim}>
            <MaterialIcons name="delete" size={hp("3%")} color={colors.Error} />
            <Text style={styles.deletetext}>Delete this whim</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelbutton}
            onPress={handleModaloff}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.MainView}>
        <ImageBackground
          source={{ uri: item.photo }}
          style={styles.ImageBackground}
        >
          <View style={styles.ImageBackgroundTran}>
            <Text style={styles.ImageBackgroundText}>${item.price}</Text>
          </View>
        </ImageBackground>

        <View style={styles.progressBarView}>
          <Text style={styles.progressText}>
            {"Hold tight, you're half way away"}
          </Text>
          <Text style={styles.progressDays}> {item.days} days</Text>

          <View style={styles.progressBackground}>
            <ProgressBarAnimated
              {...progressCustomStyles}
              width={barWidth}
              value={progress}
              backgroundColorOnComplete="red"
            />
          </View>
          <Text style={styles.progressBottomText}>
            Whim keeps you away from impulsive shopping
          </Text>
        </View>
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity onPress={Whim_Detail} style={styles.editbutton}>
          <Text style={styles.editText}>Edit whim</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onShare} style={styles.sharebutton}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>

        <NotifierRoot ref={notifierRef} />
      </View>
    </View>
  );
}
