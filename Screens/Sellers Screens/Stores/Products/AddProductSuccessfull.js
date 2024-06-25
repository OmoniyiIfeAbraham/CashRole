import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Success from "../../../../Components/General/Success";
import GeneralStyle from "../../../../Style/General.style";
import Colors from "../../../../Style/ThemeColors";

const AddProductSuccessfull = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "auto",
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <Success title="Product added successfully!" />
        <Pressable>
          <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
            Report transaction
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[
            GeneralStyle.Btn,
            {
              backgroundColor: Colors.midnightBlue,
              maxWidth: "49%",
              paddingHorizontal: 5,
            },
          ]}
          onPress={() => navigation.replace("Store")}
        >
          <Text style={[GeneralStyle.BoldText]}>See product list</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            GeneralStyle.Btn,
            {
              backgroundColor: Colors.midnightBlue,
              maxWidth: "49%",
              paddingHorizontal: 5,
            },
          ]}
          onPress={() => navigation.replace("HomeTabs")}
        >
          <Text style={[GeneralStyle.BoldText]}>Go to dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddProductSuccessfull;
