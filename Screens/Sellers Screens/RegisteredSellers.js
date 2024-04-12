import { View, Text, Pressable, Keyboard } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import NoRegisteredSellers from "../../Components/Sellers/RegisteredSellers/NoRegisteredSellers";
import RegisteredSeller from "../../Components/Sellers/RegisteredSellers/RegisteredSeller";
import Header from "../../Components/Header/Header";

const RegisteredSellers = ({ navigation }) => {
  const [isSellers, setIsSellers] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* header */}
      <Header navigation={navigation} title="Registered Sellers" />
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
