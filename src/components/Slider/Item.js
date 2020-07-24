import * as React from "react";
import { View } from "react-native";

import styles from "./styles";

class Item extends React.PureComponent {
  static defaultProps = {
    style: null,
    tenthItemStyle: null,
  };

  render() {
    const {
      oneColumnSize,
      borderWidth,
      index,
      style,
      tenthItemStyle,
    } = this.props;

    return (
      <View
        style={[
          styles.subBlock,
          { width: oneColumnSize, borderRightWidth: borderWidth },
          (index + 1) % 10 === 0
            ? { borderRightWidth: borderWidth + 2.5, height: 30 }
            : null,
          style,
          (index + 1) % 10 === 0 ? tenthItemStyle : null,
        ]}
      />
    );
  }
}

export default Item;
