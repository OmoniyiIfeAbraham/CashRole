import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";

const NoNotification = ({ navigation }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <MaterialCommunityIcons name="bell" size={30} color={Colors.black} />
      <Text
        style={[
          GeneralStyle.RegularText,
          { color: Colors.black, marginTop: 15 },
        ]}
      >
        No Notificstions yet
      </Text>
    </View>
  );
};

export default NoNotification;
