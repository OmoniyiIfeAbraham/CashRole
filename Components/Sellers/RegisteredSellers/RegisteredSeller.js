import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import Colors from "../../../Style/ThemeColors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import GeneralStyle from "../../../Style/General.style";

const RegisteredSeller = ({ navigation }) => {
  const sellers = [
    {
      id: 0,
      name: "Vivian Nnaji",
      phone: "+2347030473033",
    },
    {
      id: 1,
      name: "Adeolu Abimbola",
      phone: "+2347030473033",
    },
    {
      id: 2,
      name: "Vivian Nnaji",
      phone: "+2347030473033",
    },
    {
      id: 3,
      name: "Adeolu Abimbola",
      phone: "+2347030473033",
    },
    {
      id: 4,
      name: "Adeolu Abimbola",
      phone: "+2347030473033",
    },
  ];

  //   render flat list items
  const renderFlatListItems = useCallback(({ item }) => (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 64,
        backgroundColor: Colors.white,
        elevation: 5,
        flexDirection: "row",
        paddingVertical: 2,
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20,
        borderRadius: 10,
      }}
      onPress={() =>
        navigation.navigate("SellerProfile", { from: "AddSeller" })
      }
    >
      <View
        style={{
          backgroundColor: Colors.ash,
          borderRadius: 10,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          // marginVertical: 15,
        }}
      >
        <FontAwesome5 name="user-circle" size={18} color={Colors.black} />
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text style={[GeneralStyle.BoldText, { color: Colors.black }]}>
          {item.name}
        </Text>
        <Text
          style={[
            GeneralStyle.LightText,
            { color: Colors.black, fontSize: 22 },
          ]}
        >
          {item.phone}
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          borderColor: Colors.ash,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          height: 35,
          borderRadius: 30,
        }}
      >
        <Feather name="arrow-right" size={24} color={Colors.ash} />
      </View>
    </TouchableOpacity>
  ));

  return (
    <View style={{ paddingVertical: 5, flex: 1, paddingHorizontal: 25 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sellers}
        keyExtractor={(item) => item.id}
        renderItem={renderFlatListItems}
      />
    </View>
  );
};

export default RegisteredSeller;
