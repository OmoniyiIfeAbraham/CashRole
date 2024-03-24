import { View, Text } from "react-native";
import React from "react";
import GeneralStyle from "../../Style/General.style";
import Colors from "../../Style/ThemeColors";

const Register = () => {
  return (
    <View style={{ padding: 25 }}>
      {/* cashrole title */}
      <View
        style={{
          height: "auto",
          paddingVertical: 40,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            GeneralStyle.ExtraBoldText,
            { color: Colors.midnightBlue, fontSize: 30 },
          ]}
        >
          CASHROLE
        </Text>
      </View>
    </View>
  );
};

export default Register;
