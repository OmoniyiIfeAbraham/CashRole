import { View, Text, Pressable, Keyboard, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import { FontAwesome } from "@expo/vector-icons";

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
        >
          {/* search bar */}
          <View
            style={[
              GeneralStyle.TextInputView,
              {
                width: "50%",
                height: 40,
                backgroundColor: Colors.ash,
                borderWidth: 1,
                borderColor: Colors.white,
                borderRadius: 5,
                marginBottom: 0,
                paddingHorizontal: 4,
              },
            ]}
          >
            <FontAwesome
              name="search"
              size={24}
              color={Colors.black}
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={GeneralStyle.TextInput}
              placeholder="Search for product"
            />
          </View>
          {/* phone icon */}
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default StoreLink;
