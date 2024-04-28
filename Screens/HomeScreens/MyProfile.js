import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../Components/Header/Header";

const MyProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* header */}
      <Header navigation={navigation} title="My Profile" />
      {/* transaction */}
    </SafeAreaView>
  );
};

export default MyProfile;
