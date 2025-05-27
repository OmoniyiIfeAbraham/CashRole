import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../../Style/ThemeColors";
import { AntDesign } from "@expo/vector-icons";
import GeneralStyle from "../../../../Style/General.style";
import { baseAPIUrl } from "../../../../Global/Global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../../../Components/Auth/ErrorHandler";
import LoadingModal from "../../../../Components/LoadingModal/LoadingModal";

const ProductConfirm = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  // Debug logging
  console.log("Route params:", route?.params);

  // Safe destructuring with fallbacks
  const {
    images = [],
    productName = "",
    productDescription = "",
    store = {},
    productPrice = 0,
    sellerPrice = 0,
    myPrice = 0,
    Email = "",
  } = route?.params || {};

  console.log("Extracted data:", {
    images,
    productName,
    productDescription,
    productPrice,
    Email,
  });

  // add btn
  const addBtn = async () => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/product/auth/add?id=${store._id}`;
      let data = new FormData();
      data.append("Name", productName);
      // data.append("images", images);
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

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      // console.log(response.data);

      if (response.data?.Error === false) {
        setProduct(response.data.Product);
        SendOtp(response.data.Product._id, Email);
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: `${response.data.Error}`,
        });
      }
    } catch (error) {
      ErrorHandler(error, navigation);
    } finally {
      // setIsLoading(false);
    }
  };

  const SendOtp = async (Id, email) => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/product/auth/add/sendOtp?id=${Id}&email=${email}`;

      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      // console.log(response.data);

      if (response.data?.Error === false) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "OTP Sent Successfully",
        });
        navigation.replace("AddProductOtp", { email, store, product });
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: `${response.data.Error}`,
        });
      }
    } catch (error) {
      ErrorHandler(error, navigation);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#00000050" }}>
      {/* loader */}
      <LoadingModal Visible={isLoading} />
      <View
        style={{
          flex: 1,
          margin: 15,
          backgroundColor: Colors.white || "#ffffff",
          borderRadius: 5,
          padding: 15,
        }}
      >
        {/* Header with close button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#f0f0f0",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: Colors.black || "#000000",
            }}
          >
            Confirm Product
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="close" size={24} color={Colors.ash || "#666666"} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20 }}
        >
          {/* Images Section */}
          {images && images.length > 0 ? (
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: Colors.black || "#000000",
                  marginBottom: 10,
                }}
              >
                Images ({images.length})
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images.map((img, index) => (
                  <View
                    key={index}
                    style={{
                      width: 80,
                      height: 80,
                      marginRight: 10,
                      backgroundColor: "#f0f0f0",
                      borderRadius: 8,
                    }}
                  >
                    <Image
                      source={{ uri: img.uri }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 8,
                      }}
                      onError={(error) =>
                        console.log("Image load error:", error)
                      }
                      onLoad={() => console.log("Image loaded successfully")}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: "orange", fontSize: 14 }}>
                No images provided
              </Text>
            </View>
          )}

          {/* Product Name */}
          <View style={{ marginBottom: 15 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: Colors.black || "#000000",
                marginBottom: 5,
              }}
            >
              Product Name:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.mediumSeaGreen || "#2E8B57",
              }}
            >
              {productName || "No name provided"}
            </Text>
          </View>

          {/* Price */}
          <View style={{ marginBottom: 15 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: Colors.black || "#000000",
                marginBottom: 5,
              }}
            >
              Price:
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: Colors.mediumSeaGreen || "#2E8B57",
              }}
            >
              ₦{productPrice?.toLocaleString() || "0"}
            </Text>
          </View>

          {/* Description */}
          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: Colors.black || "#000000",
                marginBottom: 5,
              }}
            >
              Description:
            </Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                color: Colors.mediumSeaGreen || "#2E8B57",
              }}
            >
              {productDescription || "No description provided"}
            </Text>
          </View>

          {/* Raw data dump for debugging */}
          <View
            style={{
              backgroundColor: "#f8f8f8",
              padding: 10,
              borderRadius: 5,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 12, color: "#666" }}>Debug Info:</Text>
            <Text style={{ fontSize: 10, color: "#666" }}>
              Product Name: {JSON.stringify(productName)}
            </Text>
            <Text style={{ fontSize: 10, color: "#666" }}>
              Price: {JSON.stringify(productPrice)}
            </Text>
            <Text style={{ fontSize: 10, color: "#666" }}>
              Seller Price: {JSON.stringify(sellerPrice)}
            </Text>
            <Text style={{ fontSize: 10, color: "#666" }}>
              My Price: {JSON.stringify(myPrice)}
            </Text>
            <Text style={{ fontSize: 10, color: "#666" }}>
              Images Count: {images?.length || 0}
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 20,
            borderTopWidth: 1,
            borderTopColor: "#f0f0f0",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              height: 45,
              backgroundColor: "#ffffff",
              borderWidth: 1,
              borderColor: Colors.black || "#000000",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{
                color: Colors.black || "#000000",
                fontWeight: "bold",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              height: 45,
              backgroundColor: Colors.black || "#000000",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
            onPress={addBtn}
          >
            <Text
              style={{
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductConfirm;
