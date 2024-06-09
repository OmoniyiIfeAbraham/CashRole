import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useCallback } from "react";
import Colors from "../../Style/ThemeColors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import GeneralStyle from "../../Style/General.style";

const YourStores = ({ navigation }) => {
  const stores = [
    {
      id: 1,
      name: "Glamour Boutique",
      address: "Alagbaka, Akure",
    },
    {
      id: 2,
      name: "Glamour Boutique",
      address: "Surulere, Lagos",
    },
  ];

  //   render flat list items
  const renderFlatListItems = useCallback(({ item }) => (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        height: "auto",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          width: "75%",
          backgroundColor: Colors.white,
          elevation: 5,
          flexDirection: "row",
          paddingVertical: 5,
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: 20,
          maxHeight: 200,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("Store")}
      >
        <View style={{ flexDirection: "row", width: "100%" }}>
          {/* icon */}
          <View
            style={{
              backgroundColor: Colors.ash,
              borderRadius: 10,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              marginRight: "2%",
              width: "18%",
            }}
          >
            <FontAwesome5 name="store-alt" size={18} color={Colors.black} />
          </View>
          {/* name and address */}
          <View style={{ justifyContent: "flex-start", width: "80%" }}>
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
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "20%",
          backgroundColor: Colors.tomato,
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 54,
          borderRadius: 5,
        }}
      >
        <Text
          style={[
            GeneralStyle.LightText,
            { color: Colors.white, textAlign: "center", borderRadius: 5 },
          ]}
        >
          Delete Store
        </Text>
      </TouchableOpacity>
    </View>
  ));

  return (
    <View style={{ paddingVertical: 5, flex: 1, paddingHorizontal: "2%" }}>
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

export default YourStores;
