import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GeneralStyle from "../Style/General.style";
import Colors from "../Style/ThemeColors";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Notifications from "../Components/Notifications/Notifications";
import NoNotification from "../Components/Notifications/NoNotification";

const History = ({ navigation }) => {
  const [isNotification, setIsNotification] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      <Text
        style={[
          GeneralStyle.ExtraBoldText,
          { color: Colors.midnightBlue, marginLeft: 15, fontSize: 30 },
        ]}
      >
        History
      </Text>

      {isNotification ? (
        <Notifications navigation={navigation} />
      ) : (
        <NoNotification navigation={navigation} />
      )}
      {/* create a seller */}
      {/* <TouchableOpacity
          style={{
            width: "100%",
            height: 100,
            flexDirection: "row",
            elevation: 5,
            backgroundColor: Colors.white,
            borderRadius: 5,
            shadowColor: Colors.black,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            paddingHorizontal: 15,
            paddingVertical: 8,
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
          // onPress={() => navigation.navigate("CreateSeller")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: Colors.midnightBlue,
                padding: 20,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5
                name="users"
                size={36}
                color={Colors.white}
              />
            </View>
            <Text
              style={[
                GeneralStyle.BoldText,
                { color: Colors.midnightBlue, fontSize: 20, marginLeft: 10 },
              ]}
            >
              Recently Added Sellers
            </Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={46}
            color={Colors.midnightBlue}
          />
        </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({});
