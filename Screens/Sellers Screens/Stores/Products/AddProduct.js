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

const AddProduct = ({ navigation, route }) => {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const { store, Email } = route.params;
  console.log(store);

  const handleNext = () => {
    navigation.navigate("AddProduct2", {
      images,
      productName,
      productDescription,
      store,
      Email,
    });
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

          {/* btn */}
          <View
            style={{ width: "100%", paddingHorizontal: 50, marginVertical: 10 }}
          >
            <TouchableOpacity
              style={[
                GeneralStyle.Btn,
                { backgroundColor: Colors.midnightBlue },
              ]}
              onPress={handleNext}
            >
              <Text style={[GeneralStyle.BoldText]}>Next {">>>"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddProduct;
