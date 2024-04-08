import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../../Style/ThemeColors";
import GeneralStyle from "../../../Style/General.style";

const NoRegisteredSellers = ({ navigation }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <MaterialIcons name="store" size={30} color={Colors.black} />
      <Text
        style={[
          GeneralStyle.RegularText,
          { color: Colors.black, marginTop: 15 },
        ]}
      >
        No registered seller
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("CreateSeller")}
      >
        <Text
          style={[GeneralStyle.MediumText, { color: Colors.cadetBlue }]}
        >
          Add
        </Text>
        <Entypo name="plus" size={36} color={Colors.cadetBlue} />
      </TouchableOpacity>
    </View>
  );
};

export default NoRegisteredSellers;
