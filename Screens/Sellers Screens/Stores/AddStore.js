import { View, Text, Pressable, Keyboard } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../../Style/ThemeColors";
import GeneralStyle from "../../../Style/General.style";
import Header from "../../../Components/Header/Header";

const AddStore = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {/* header */}
        <Header navigation={navigation} title="Add Store" />
      </Pressable>
    </SafeAreaView>
  );
};

export default AddStore;
