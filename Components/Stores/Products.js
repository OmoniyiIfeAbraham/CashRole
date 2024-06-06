import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { useCallback } from "react";
import Colors from "../../Style/ThemeColors";
import { FontAwesome5 } from "@expo/vector-icons";
import GeneralStyle from "../../Style/General.style";

const { width } = Dimensions.get("screen");

const Products = ({ navigation }) => {
  const products = [
    {
      id: 1,
      img: require("./../../assets/Notifications/tomatoes.jpg"),
      name: "One bag of tomatoes cooked",
      address: "Alagbaka. Akure",
      amount: "10,000",
    },
    {
      id: 2,
      img: require("./../../assets/Notifications/nike.png"),
      name: "Glamour Boutique",
      address: "Alagbaka. Akure",
      amount: "70,000",
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
          paddingVertical: 2,
          justifyContent: "start",
          alignItems: "center",
          marginBottom: 20,
          height: "auto",
          borderRadius: 10,
        }}
        // onPress={() => navigation.navigate("Store")}
      >
        <View
          style={{
            flexDirection: "row",
            width: "75%",
            height: 64,
            paddingVertical: 5,
            paddingLeft: 5,
          }}
        >
          {/* image */}
          <View
            style={{
              backgroundColor: Colors.white,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
              width: "25%",
              height: "100%",
            }}
          >
            <Image
              source={item.img}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 5,
              }}
              resizeMode="cover"
            />
          </View>
          {/* name and address */}
          <View style={{ justifyContent: "flex-start", width: "75%" }}>
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
    <View style={{ paddingVertical: 5, flex: 1, paddingHorizontal: 25 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderFlatListItems}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default Products;
