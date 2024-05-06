import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../Components/Header/Header";
import Colors from "../../../Style/ThemeColors";
import GeneralStyle from "../../../Style/General.style";
import YourStores from "../../../Components/Stores/YourStores";

const ManageStore = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* header */}
      <Header navigation={navigation} title="Vivian Nnaji Stores" />
      {/* body */}
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
      {/* stores */}
      <YourStores />
    </SafeAreaView>
  );
};

export default ManageStore;
