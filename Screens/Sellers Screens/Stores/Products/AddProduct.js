import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../../Components/Header/Header";
import GeneralStyle from "../../../../Style/General.style";
import Colors from "../../../../Style/ThemeColors";
import { FontAwesome6 } from "@expo/vector-icons";

const AddProduct = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
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
          Product name
        </Text>
        <View style={[GeneralStyle.TextInputView, { width: "100%" }]}>
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="Enter name of product here"
            placeholderTextColor={Colors.ash}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {/* Upload Photo */}
        <View
          style={{
            width: "100%",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* title */}
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.black, marginTop: 50 },
            ]}
          >
            Upload Photo(s)
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              elevation: 5,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              padding: 25,
              marginTop: 5,
            }}
          >
            <FontAwesome6 name="add" size={24} color={Colors.black} />
          </TouchableOpacity>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddProduct;
