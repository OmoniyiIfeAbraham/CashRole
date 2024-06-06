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

const AddProduct = ({ navigation }) => {
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
        >
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
          <ImageUploader width="100%" height="60%" />
          {/* Other components can go here */}
          <Text>zdxgfhcgjwervbk</Text>
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddProduct;
