import {
  View,
  Text,
  Pressable,
  Keyboard,
  TouchableOpacity,
} from "react-native";
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
      <Header navigation={navigation} title="Registered Seller" />
      {/* body */}
      {/* btn */}
      <View
        style={{ width: "100%", paddingHorizontal: 50, marginVertical: 20 }}
      >
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
          onPress={() => navigation.navigate("CreateSeller")}
        >
          <Text style={[GeneralStyle.BoldText]}>Add Seller</Text>
        </TouchableOpacity>
      </View>
      {isSellers ? (
        <RegisteredSeller navigation={navigation} />
      ) : (
        <NoRegisteredSellers navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

export default RegisteredSellers;
