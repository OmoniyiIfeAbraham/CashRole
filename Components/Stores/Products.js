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
import GeneralStyle from "../../Style/General.style";

const { width } = Dimensions.get("screen");

const Products = ({ navigation, products, onRefresh, isRefreshing, store }) => {
  // Render flat list items
  const renderFlatListItems = useCallback(({ item }) => (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: Colors.white,
          elevation: 5,
          flexDirection: "row",
          paddingVertical: 2,
          justifyContent: "start",
          alignItems: "center",
          marginBottom: 20,
          borderRadius: 10,
        }}
        activeOpacity={0.7}
        // onPress={() => navigation.navigate("Store")}
      >
        <View
          style={{
            flexDirection: "row",
            width: "75%",
            paddingVertical: 5,
            paddingLeft: 5,
          }}
        >
          {/* Image */}
          <View
            style={{
              backgroundColor: Colors.white,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
              width: 64,
              height: 64,
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
          {/* Name and address */}
          <View
            style={{
              flexShrink: 1,
              flexGrow: 1,
            }}
          >
            <Text
              style={[
                GeneralStyle.BoldText,
                { color: Colors.black, flexWrap: "wrap" },
              ]}
            >
              {item.name}
            </Text>
            <Text
              style={[
                GeneralStyle.LightText,
                { color: Colors.black, fontSize: 20, flexWrap: "wrap" },
              ]}
            >
              {item.address}
            </Text>
          </View>
        </View>
        {/* buttons */}
        <View
          style={{
            width: "25%",
            height: "auto",
            paddingVertical: 2,
          }}
        >
          <TouchableOpacity
            style={{
              width: "95%",
              backgroundColor: Colors.midnightBlue,
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
              borderRadius: 5,
              marginBottom: 2,
            }}
            onPress={() => navigation.navigate("AddProduct")}
          >
            <Text
              style={[
                GeneralStyle.LightText,
                {
                  color: Colors.white,
                  textAlign: "center",
                  borderRadius: 5,
                  fontSize: 21,
                },
              ]}
            >
              Edit Product
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "95%",
              backgroundColor: Colors.tomato,
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate("ConfirmDeleteProduct")}
          >
            <Text
              style={[
                GeneralStyle.LightText,
                {
                  color: Colors.white,
                  textAlign: "center",
                  borderRadius: 5,
                  fontSize: 21,
                },
              ]}
            >
              Delete Product
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  ));

  return (
    <View style={{ paddingVertical: 5, flex: 1, paddingHorizontal: 25 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFlatListItems}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default Products;
