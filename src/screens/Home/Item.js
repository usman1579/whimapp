import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import styled from "styled-components";
import * as colors from "../../Token/token";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Whim = styled(TouchableOpacity)`
  height: 280px;
  width: 100%;
  align-items: center;
  margin: 10px 0;
`;

const RoundedImage = styled(Image)`
  height: 200px;
  width: 91%;
  background-color: ${colors.White};
  border-radius: 6px;
`;

const Name = styled(Text)`
  font-size: ${hp("2%")};
  font-family: "Gilroy-Medium";
  color: ${colors.Bunting};
  margin: 10px 0;
`;

const Price = styled(Text)`
  font-size: ${hp("2%")};
  font-family: "Gilroy-Medium";
  color: ${colors.Bunting};
  margin: 10px 0;
`;

const Days = styled(Text)`
  color: ${colors.ShipCove};
  letter-spacing: -0.02;
  font-size: ${hp("2%")};
  font-family: "Gilroy-Medium";
`;

const Wrapper = styled(View)`
  align-self: flex-start;
  margin: 0px 20px;
`;

const Item = ({ item, navigation, completed }) => {
  var createdtime = new Date(item.timeStamp.seconds * 1000);
  var current_time = new Date().getTime();
  var daysdifference = current_time - createdtime;
  var days = daysdifference / 86400000;
  var days1 = days.toString();
  var total_days = days1.split(".")[0];

  return (
    <Whim
      activeOpacity={0.9}
      onPress={() => navigation.navigate("WhimDetail", { item: item })}
    >
      <RoundedImage source={{ uri: item.photo }} />

      <Wrapper>
        <Name>{item.name}</Name>
        <Price>
          ${item.price}
          <Days onPress={() => completed(item)}>
            {"  "} |{" "}
            {total_days < item.days
              ? item.days - total_days
              : "Ready to decide"}{" "}
          </Days>
        </Price>
      </Wrapper>
    </Whim>
  );
};

export default Item;
