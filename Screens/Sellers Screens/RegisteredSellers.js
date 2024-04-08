import { View, Text, Pressable, Keyboard } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import NoRegisteredSellers from "../../Components/Sellers/RegisteredSellers/NoRegisteredSellers";

const RegisteredSellers = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* header */}
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
          Registered Sellers
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
      {/* body */}
      <NoRegisteredSellers navigation={navigation} />
    </SafeAreaView>
  );
};

export default RegisteredSellers;
