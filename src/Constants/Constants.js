import { Dimensions } from "react-native";
import { Crusta, Solitude } from "../Token/token";

export const progressCustomStyles = {
  backgroundColor: Crusta,
  height: 10,
  borderRadius: 6,
  borderColor: Solitude,
};

export const barWidth = Dimensions.get("screen").width - 60;
