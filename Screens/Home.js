import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../Style/ThemeColors";
import GeneralStyle from "../Style/General.style";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 25 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* header */}
        <View
          style={{
            width: "100%",
            height: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                padding: 25,
                backgroundColor: Colors.ash,
                borderRadius: 50,
                marginRight: 10,
              }}
            >
              <FontAwesome5 name="user-alt" size={30} color={Colors.white} />
            </View>
            <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
              Hello, Eclipse
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="bell"
              size={40}
              color={Colors.midnightBlue}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
