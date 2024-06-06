import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useCallback } from "react";
import Colors from "../../Style/ThemeColors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import GeneralStyle from "../../Style/General.style";

const RecentStores = ({ navigation }) => {
  const stores = [
    {
      id: 1,
      name: "Glamour Boutique",
      address: "Iwo road, Ibadan",
    },
    {
      id: 2,
      name: "Glamour Boutique",
      address: "Alagbaka, Akure",
    },
    {
      id: 3,
      name: "Glamour Boutique",
      address: "Abuja",
    },
  ];

  //   render flat list items
  const renderFlatListItems = useCallback(({ item }) => (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: Colors.white,
        elevation: 5,
        flexDirection: "row",
        paddingVertical: 2,
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20,
        height: 64,
        borderRadius: 10,
      }}
      onPress={() => navigation.navigate("Store")}
    >
      <View style={{ flexDirection: "row", width: "auto" }}>
        {/* icon */}
        <View
          style={{
            backgroundColor: Colors.ash,
            borderRadius: 10,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <FontAwesome5 name="store-alt" size={18} color={Colors.black} />
        </View>
        {/* name and address */}
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={[GeneralStyle.BoldText, { color: Colors.black }]}>
            {item.name}
          </Text>
          <Text
            style={[
              GeneralStyle.LightText,
              { color: Colors.black, fontSize: 20 },
            ]}
          >
            {item.address}
          </Text>
        </View>
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
        data={stores}
        keyExtractor={(item) => item.id}
        renderItem={renderFlatListItems}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default RecentStores;
