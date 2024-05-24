import { View, Text, Pressable, Keyboard } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../Style/ThemeColors";

const StoreLink = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* keyboard dismiss */}
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {/* header */}
        <View
          style={{
            width: "100%",
            height: 50,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: Colors.midnightBlue,
          }}
        ></View>
      </Pressable>
    </SafeAreaView>
  );
};

export default StoreLink;
