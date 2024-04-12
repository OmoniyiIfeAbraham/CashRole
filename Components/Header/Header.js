import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";

const Header = ({ navigation, title }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <MaterialIcons
        name="keyboard-arrow-left"
        size={40}
        color={Colors.midnightBlue}
        onPress={() => navigation.goBack()}
      />
      <Text
        style={[GeneralStyle.ExtraBoldText, { color: Colors.midnightBlue }]}
      >
        {title}
      </Text>
      {/* invisible view */}
      <View style={{ opacity: 0 }}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={40}
          color={Colors.midnightBlue}
        />
      </View>
    </View>
  );
};

export default Header;
