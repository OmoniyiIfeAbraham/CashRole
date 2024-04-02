import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../Style/ThemeColors";
import GeneralStyle from "../Style/General.style";
import WithdrawComponent from "../Components/HomeScreen/WithdrawComponent";

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
                padding: 15,
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
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name="bell"
              size={35}
              color={Colors.midnightBlue}
            />
          </TouchableOpacity>
        </View>
        {/* balance */}
        <View style={{ marginTop: 30 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.black, marginRight: 20 },
              ]}
            >
              Total Balance
            </Text>
            <AntDesign name="exclamationcircleo" size={24} color="black" />
          </View>
          <Text
            style={[
              GeneralStyle.BoldText,
              { color: Colors.black, fontSize: 30 },
            ]}
          >
            #100,000.00
          </Text>
        </View>
        {/* withdraw */}
        <WithdrawComponent />
        {/* links */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            width: "100%",
            justifyContent: "space-between",
            paddingHorizontal: 75,
            alignItems: "center",
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.midnightBlue,
                padding: 25,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="content-copy"
                size={36}
                color={Colors.white}
              />
            </TouchableOpacity>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.ash, marginTop: 5 },
              ]}
            >
              Store Link
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.midnightBlue,
                padding: 25,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="person-add" size={36} color={Colors.white} />
            </TouchableOpacity>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.ash, marginTop: 5 },
              ]}
            >
              Create a seller
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
