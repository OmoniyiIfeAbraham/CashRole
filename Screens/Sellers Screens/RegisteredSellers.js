import { View, Text, Pressable, Keyboard } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import NoRegisteredSellers from "../../Components/Sellers/RegisteredSellers/NoRegisteredSellers";
import RegisteredSeller from "../../Components/Sellers/RegisteredSellers/RegisteredSeller";

const RegisteredSellers = ({ navigation }) => {
  const [isSellers, setIsSellers] = useState(true);

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
      {isSellers ? (
        <RegisteredSeller navigation={navigation} />
      ) : (
        <NoRegisteredSellers navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

export default RegisteredSellers;
