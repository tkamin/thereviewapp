import * as React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const GradientIcon = (props) => {
  var widthShownPx = props.fractionShown * 20 + 2;
  var marginRight = 22 - widthShownPx;

  return (
    <View
      style={{
        width: widthShownPx,
        height: 24,
        overflow: "hidden",
        marginRight: marginRight,
      }}
    >
      <Icon name="star" size={24} color="#FEC601" />
    </View>
  );
};

const DynamicStarImage = ({ item }) => {
  let remainingStars = item.rating ? item.rating : 0;
  let container = [];
  let index = 0;
  while (remainingStars > 0) {
    var fraction = remainingStars >= 1 ? 1 : remainingStars;

    container.push(
      <GradientIcon
        fractionShown={fraction}
        key={(item.id ? item.id : item) + "-" + index}
      />
    );
    remainingStars -= fraction;
    index++;
  }
  return container;
};

export default DynamicStarImage;
