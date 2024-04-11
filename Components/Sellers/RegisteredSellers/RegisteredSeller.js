import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import Colors from "../../../Style/ThemeColors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import GeneralStyle from "../../../Style/General.style";

const RegisteredSeller = ({ navigation }) => {
  const sellers = [
    {
      id: 0,
      name: "Jasmin Judy Love",
      phone: "+2347896582342",
    },
    {
      id: 1,
      name: "Rock Bass Lander",
      phone: "+2348523789512",
    },
  ];

  //   render flat list items
  const renderFlatListItems = useCallback(({ item }) => (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 70,
        backgroundColor: Colors.white,
        elevation: 1,
        flexDirection: "row",
        paddingVertical: 2,
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20,
      }}
      onPress={() => navigation.navigate("SellersProfile")}
    >
      <View
        style={{
          backgroundColor: Colors.ash,
          borderRadius: 15,
          padding: 18,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome5 name="user-circle" size={25} color={Colors.black} />
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
    <View style={{ paddingVertical: 5, flex: 1 }}>
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
