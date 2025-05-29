import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../../Components/Header/Header";
import GeneralStyle from "../../../../Style/General.style";
import Colors from "../../../../Style/ThemeColors";
import ImageUploader from "../../../../Components/Products/ImageUploader";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const EditProduct = ({ navigation, route }) => {
  const { product } = route.params;
  console.log("product: ", product);
  const [images, setImages] = useState(product.Images || []);
  const [productName, setProductName] = useState(product.Name || "");
  const [productDescription, setProductDescription] = useState(
    product.Details || ""
  );
  const [productPrice, setProductPrice] = useState(
    product.Price.toString() || 0
  );
  const [sellerPrice, setSellerPrice] = useState(
    product.SellerPrice.toString() || 0
  );
  const [myPrice, setMyPrice] = useState(product.MyPrice.toString() || 0);

  const handleNext = () => {
    if (images.length <= 1) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error!! Please upload at least 2 images.",
      });
      return;
    } else {
      navigation.navigate("AddProduct2", {
        images,
        productName,
        productDescription,
        store,
        Email,
      });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      <Pressable
        style={{ flex: 1, width: "100%", height: "100%" }}
        onPress={() => Keyboard.dismiss()}
      >
        {/* header */}
        <Header navigation={navigation} title="Add new product" />
        {/* form */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* title */}
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.black, marginBottom: 5 },
            ]}
          >
            Product name
          </Text>
          <View style={[GeneralStyle.TextInputView, { width: "100%" }]}>
            <TextInput
              style={GeneralStyle.TextInput}
              placeholder="Enter name of product here"
              placeholderTextColor={Colors.ash}
              autoCapitalize="none"
              keyboardType="default"
              value={productName}
              onChangeText={(text) => setProductName(text)}
            />
          </View>
          {/* Upload Photo */}
          <ImageUploader
            width="100%"
            height="60%"
            images={images}
            setImages={setImages}
          />
          {/* Other components can go here */}
          {/* title */}
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.black, marginBottom: 5 },
            ]}
          >
            Describe the product details
          </Text>
          <View
            style={[
              GeneralStyle.TextInputView,
              { width: "100%", height: 150, alignItems: "flex-start" },
            ]}
          >
            <TextInput
              style={GeneralStyle.TextInput}
              autoCapitalize="none"
              keyboardType="default"
              multiline={true}
              numberOfLines={8}
              value={productDescription}
              onChangeText={(text) => setProductDescription(text)}
            />
          </View>

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
              onChangeText={(text) => setProductPrice(text)}
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
              onChangeText={(text) => setSellerPrice(text)}
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
              onChangeText={(text) => setMyPrice(text)}
            />
          </View>

          {/* btn */}
          <View
            style={{ width: "100%", paddingHorizontal: 50, marginVertical: 10 }}
          >
            <TouchableOpacity
              style={[
                GeneralStyle.Btn,
                { backgroundColor: Colors.midnightBlue },
              ]}
              // onPress={handleNext}
            >
              <Text style={[GeneralStyle.BoldText]}>Next {">>>"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
};

export default EditProduct;
