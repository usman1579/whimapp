import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import Button from "../../components/Button";
import TakePhoto from "../../../assets/TakePhoto.png";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as colors from "../../Token/token";
import { Container } from "../../CommonStyle/commonStyle";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  container: Container,
  headerbackcolor: {
    backgroundColor: "transparent",
  },
  headerTitleView: {
    alignItems: "center",
    flex: 1,
  },
  HeaderTitle: {
    color: colors.Black,
    fontWeight: "bold",
    fontFamily: "Gilroy-Bold",
    fontSize: 20,
  },
  MainView: {
    alignItems: "center",
    flex: 1,
  },
  ImageBackgroundView: {
    height: hp("24%"),
    width: "90%",
    backgroundColor: colors.Solitude,
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#EEF1F7",
    marginTop: 20,
  },
  ImageBackground: {
    height: "100%",
    width: "100%",
    position: "relative",
    alignItems: "center",
  },
  ChangePhotoButton: {
    height: 36,
    width: 175,
    backgroundColor: colors.White,
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    zIndex: 1000,
    flexDirection: "row",
    shadowColor: colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  changeText: {
    color: colors.Bunting,
    fontFamily: "Gilroy-SemiBold",
    marginLeft: 20,
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 20,
  },
  TextInputView: {
    width: "90%",
    backgroundColor: colors.GhostWhite,
    marginVertical: 12,
    borderRadius: 6,
  },
  Input: {
    backgroundColor: colors.GhostWhite,
    height: 50,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  ButtonView: {
    position: "absolute",
    bottom: hp("3%"),
    backgroundColor: colors.White,
    alignSelf: "center",
  },
});

export default function NewWhim({ navigation }) {
  const [Photo, setPhoto] = useState("");
  const [Name, setName] = useState("");
  const EditWhim = useSelector((state) => state.EditWhim);
  const CurrentItem = useSelector((state) => state.currentWhim);

  useEffect(() => {
    if (EditWhim) {
      setPhoto(CurrentItem.photo);
      setName(CurrentItem.name);
    }
  }, []);

  const ImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setPhoto(result.uri);
      }
    } catch (E) {
      alert(E);
    }
  };

  const renderButton = () => {
    if (Name === "") {
      return null;
    }
    return (
      <View style={styles.ButtonView}>
        <Button text="Continue" onPress={onPress} />
      </View>
    );
  };

  const onPress = () => {
    if (Photo === "") {
      navigation.navigate("Cost", {
        name: Name,
        photo:
          "https://firebasestorage.googleapis.com/v0/b/whim-backend-b6506.appspot.com/o/Static%2Fgettyimages-840113538-612x612.jpg?alt=media&token=a4ac2bcf-0f6b-4742-a459-3e1b18c923be",
      });
    } else {
      navigation.navigate("Cost", { name: Name, photo: Photo });
    }
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      <Appbar.Header style={styles.headerbackcolor}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Create New Whim"
          titleStyle={styles.HeaderTitle}
        />
      </Appbar.Header>

      <View style={styles.MainView}>
        <View style={styles.ImageBackgroundView}>
          {Photo === "" && EditWhim === false ? (
            <ImageBackground
              source={TakePhoto}
              imageStyle={{ opacity: 0.1 }}
              style={styles.ImageBackground}
            >
              <TouchableOpacity
                style={styles.ChangePhotoButton}
                onPress={ImagePick}
              >
                <FontAwesome name="camera" size={16} color="black" />
                <Text style={styles.changeText}>Change Photo</Text>
              </TouchableOpacity>
            </ImageBackground>
          ) : (
            <ImageBackground
              source={{ uri: Photo }}
              style={styles.ImageBackground}
            >
              <TouchableOpacity
                style={styles.ChangePhotoButton}
                onPress={ImagePick}
              >
                <SimpleLineIcons name="camera" size={22} color="black" />
                <Text style={styles.changeText}>Change Photo</Text>
              </TouchableOpacity>
            </ImageBackground>
          )}
        </View>

        <View style={styles.TextInputView}>
          <TextInput
            placeholder="What would you like to buy?"
            placeholderTextColor={colors.secondary}
            style={styles.Input}
            value={Name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        {renderButton()}
      </View>
    </KeyboardAvoidingView>
  );
}
