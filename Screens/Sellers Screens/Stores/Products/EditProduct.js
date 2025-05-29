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
import { baseAPIUrl } from "../../../../Global/Global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ErrorHandler from "../../../../Components/Auth/ErrorHandler";
import LoadingModal from "../../../../Components/LoadingModal/LoadingModal";

const EditProduct = ({ navigation, route }) => {
  const { product, store, email } = route.params;
  console.log("product: ", product);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState(product.Images || []);
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
  const [isLoading, setIsLoading] = useState(false);
  // add btn
  const editBtn = async () => {
    if (images.length <= 1 && oldImages.length <= 1) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error!! Please upload at least 2 images.",
      });
      return;
    }
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/product/auth/edit?id=${product._id}`;
      let data = new FormData();
      data.append("Name", productName);
      data.append("Details", productDescription);
      data.append("Price", productPrice);
      data.append("SellerPrice", sellerPrice);
      data.append("MyPrice", myPrice);

      if (images && images.length > 0) {
        // Method 1: If your backend expects multiple files with same field name
        images.forEach((image, index) => {
          const imageFile = {
            uri: image.uri,
            type: image.mimeType || "image/jpeg",
            name: image.fileName || `image_${index}.jpg`,
          };
          data.append("images", imageFile);
        });
      } else {
        console.log("No images to upload");
      }

      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);

      const response = await axios.patch(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      console.log(response.data);

      if (response.data?.Error === false) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Product Updated Successfully",
        });
        navigation.navigate("Store", { store, Email: email });
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: `${response.data.Error}`,
        });
      }
    } catch (error) {
      console.log("Error in editBtn: ", error.message);
      ErrorHandler(error, navigation);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      <Pressable
        style={{ flex: 1, width: "100%", height: "100%" }}
        onPress={() => Keyboard.dismiss()}
      >
        {/* loader */}
        <LoadingModal Visible={isLoading} />
        {/* header */}
        <Header navigation={navigation} title="Edit product" />
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
          {/* <View style={{ flex: 1, width: "100%", height: "60%" }}> */}
            <ImageUploader
              width="100%"
              height="60%"
              images={oldImages || images}
              setImages={setOldImages || setImages}
            />
          {/* </View> */}
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
              onPress={editBtn}
            >
              <Text style={[GeneralStyle.BoldText]}>Edit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
};

export default EditProduct;
