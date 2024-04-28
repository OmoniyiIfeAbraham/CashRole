import { View, Text, Pressable, Keyboard } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import WithdrawComponent from "../../Components/HomeScreen/WithdrawComponent";

const SellerProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
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
            Seller's profile
          </Text>
          {/* invisible view */}
          <View>
            <MaterialIcons
              name="history-edu"
              size={30}
              color={Colors.midnightBlue}
            />
            <Text
              style={[
                GeneralStyle.LightText,
                { color: Colors.black, fontSize: 12 },
              ]}
            >
              History
            </Text>
          </View>
        </View>
        <Text
          style={[
            GeneralStyle.MediumText,
            { color: Colors.black, marginTop: 25 },
          ]}
        >
          Vivian Nnaji
        </Text>
        {/* withdraw */}
        <View style={{ height: "25%" }}>
          <WithdrawComponent
            navigation={navigation}
            title="Your Available Balance"
            amount="5,000"
          />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default SellerProfile;
