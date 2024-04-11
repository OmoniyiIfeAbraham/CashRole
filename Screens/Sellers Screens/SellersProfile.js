import { View, Text, Pressable, Keyboard } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";

const SellersProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
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
            Seller's Profile
          </Text>
          <View>
            <MaterialCommunityIcons
              name="store-plus"
              size={40}
              color={Colors.midnightBlue}
            />
          </View>
        </View>
        {/* form title view */}
        <View
          style={{
            width: "100%",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 40,
          }}
        >
          {/* first half */}
          <View
            style={{
              width: "80%",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: Colors.ash,
                borderRadius: 50,
                padding: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="user-alt" size={36} color={Colors.white} />
            </View>
            <Text
              style={[
                GeneralStyle.BoldText,
                { color: Colors.black, marginLeft: 10, textAlign: "center" },
              ]}
            >
              Percentage Cut
            </Text>
          </View>
          {/* second half */}
          <View
            style={{
              width: "20%",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="pen" size={24} color={Colors.black} />
            <View style={{ width: "20%" }}></View>
            <MaterialIcons name="save" size={28} color={Colors.black} />
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default SellersProfile;
