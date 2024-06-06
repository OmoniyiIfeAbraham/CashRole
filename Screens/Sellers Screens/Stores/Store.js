import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../Components/Header/Header";
import GeneralStyle from "../../../Style/General.style";
import Colors from "../../../Style/ThemeColors";
import Products from "../../../Components/Stores/Products";

const Store = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* header */}
      <Header navigation={navigation} title="Glamour Boutique" />
      {/* body */}
      {/* store location */}
      <View
        style={{
          width: "100%",
          height: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            GeneralStyle.RegularText,
            { color: Colors.black, fontSize: 20 },
          ]}
        >
          Alagbaka, Akure
        </Text>
      </View>
      {/* btn */}
      <View
        style={{ width: "100%", paddingHorizontal: 50, marginVertical: 20 }}
      >
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
            onPress={() => navigation.navigate("AddProduct")}
        >
          <Text style={[GeneralStyle.BoldText]}>Add Product</Text>
        </TouchableOpacity>
      </View>
      {/* products */}
      <Products navigation={navigation} />
    </SafeAreaView>
  );
};

export default Store;
