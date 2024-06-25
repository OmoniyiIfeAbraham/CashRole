import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../../Components/Header/Header";
import GeneralStyle from "../../../../Style/General.style";
import Colors from "../../../../Style/ThemeColors";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const AddProduct2 = ({ navigation, route }) => {
  const [productPrice, setProductPrice] = useState(0);
  const [sellerPrice, setSellerPrice] = useState(0);
  const [myPrice, setMyPrice] = useState(0);
  const { images } = route.params;

  // price handler
  const productPriceChange = (text) => {
    setProductPrice(text);
  };
  const sellerPriceChange = (text) => {
    setSellerPrice(text);
  };
  const myPriceChange = (text) => {
    setMyPrice(text);
  };

  const proceed = () => {
    if (
      Number(myPrice) + Number(sellerPrice) < Number(productPrice) ||
      Number(myPrice) + Number(sellerPrice) > Number(productPrice)
    ) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error!! Sharing does not match total amount.",
      });
    } else {
      navigation.navigate("ProductConfirm", { images });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      <ScrollView
        style={{ flex: 1, width: "100%", height: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {/* header */}
        <Header navigation={navigation} title="Add new product" />
        {/* form */}
        {/* title */}
        <Text
          style={[
            GeneralStyle.RegularText,
            { color: Colors.black, marginBottom: 5, marginTop: 25 },
          ]}
        >
          Add product price
        </Text>
        <View style={[GeneralStyle.TextInputView, { width: "100%" }]}>
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="Price"
            placeholderTextColor={Colors.ash}
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={productPriceChange}
            value={productPrice}
          />
        </View>
        <Text
          style={[
            GeneralStyle.ExtraBoldText,
            { color: Colors.black, marginTop: 50, marginBottom: 25 },
          ]}
        >
          How do you want to share income
        </Text>
        {/* title for seller price */}
        <Text
          style={[
            GeneralStyle.RegularText,
            { color: Colors.black, marginBottom: 5 },
          ]}
        >
          Seller
        </Text>
        <View style={[GeneralStyle.TextInputView, { width: "100%" }]}>
          <TextInput
            style={GeneralStyle.TextInput}
            placeholderTextColor={Colors.ash}
            autoCapitalize="none"
            keyboardType="numeric"
            value={sellerPrice}
            onChangeText={sellerPriceChange}
          />
        </View>
        {/* title for me */}
        <Text
          style={[
            GeneralStyle.RegularText,
            { color: Colors.black, marginBottom: 5 },
          ]}
        >
          Me
        </Text>
        <View style={[GeneralStyle.TextInputView, { width: "100%" }]}>
          <TextInput
            style={GeneralStyle.TextInput}
            placeholderTextColor={Colors.ash}
            autoCapitalize="none"
            keyboardType="numeric"
            value={myPrice}
            onChangeText={myPriceChange}
          />
        </View>
        {/* btn */}
        <View
          style={{ width: "100%", paddingHorizontal: 50, marginVertical: 50 }}
        >
          <TouchableOpacity
            style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
            onPress={() => proceed()}
          >
            <Text style={[GeneralStyle.BoldText]}>Next {">>>"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProduct2;
