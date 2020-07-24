import { StyleSheet } from "react-native";
import { Nobel } from "../../Token/token";

var styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  middleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: "center",
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: "center",
  },
  defaultThumb: {
    position: "absolute",
    left: "50%",
    top: -40,
    borderLeftWidth: 3,
    height: 100,
    alignSelf: "center",
    borderWidth: 10,
    borderRadius: 10,
    borderColor: "white",
  },
  mainBlock: {
    borderRightWidth: 1,
    borderColor: Nobel,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  lastBlock: {
    borderRightWidth: 1,
  },
  subBlock: {
    height: 20,
    backgroundColor: "transparent",
    flexDirection: "row",
    borderColor: "white",
  },
  subBlockLine: {
    borderRightWidth: 1,
    borderColor: Nobel,
    height: 10,
  },
  blocksContainer: {
    flexDirection: "row",
  },
});
export default styles;
