import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import RecentStores from "../../Components/HomeScreen/RecentStores";
import Header from "../../Components/Header/Header";

const Stores = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* header */}
      <Header navigation={navigation} title="Your Stores" />
      {/* <View style={{ marginTop: 15, alignItems: "center", marginBottom: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.midnightBlue,
              padding: 25,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="store"
              size={36}
              color={Colors.white}
            />
          </View>
        </View>
        <Text
          style={[
            GeneralStyle.ExtraBoldText,
            { color: Colors.midnightBlue, fontSize: 30, marginTop: 15 },
          ]}
        >
          Your Stores
        </Text>
      </View> */}
      {/* btn */}
      <View
        style={{ width: "100%", paddingHorizontal: 50, marginVertical: 20 }}
      >
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
          onPress={() => navigation.navigate("AddStore")}
        >
          <Text style={[GeneralStyle.BoldText]}>Add Store</Text>
        </TouchableOpacity>
      </View>
      <RecentStores />
    </SafeAreaView>
  );
};

export default Stores;
