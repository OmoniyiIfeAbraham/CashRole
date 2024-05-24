import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../Components/Header/Header";
import NoNotification from "../../Components/Notifications/NoNotification";
import Notifications from "../../Components/Notifications/Notifications";

const Notification = ({ navigation }) => {
  const [isNotification, setIsNotification] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* header */}
      <Header navigation={navigation} title="Notification Center" />
      {isNotification ? (
        <Notifications navigation={navigation} />
      ) : (
        <NoNotification navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

export default Notification;
