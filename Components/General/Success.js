import { View, Text } from "react-native";
import React from "react";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";

const Success = ({ title }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 300,
        backgroundColor: Colors.midnightBlue,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={[GeneralStyle.BoldText, { fontSize: 30 }]}>{title}</Text>
    </View>
  );
};

export default Success;
