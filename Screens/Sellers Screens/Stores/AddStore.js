import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../../../Style/ThemeColors";
import GeneralStyle from "../../../Style/General.style";
import Header from "../../../Components/Header/Header";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import States from "../../../Components/Stores/States";
import Cities from "../../../Components/Stores/Cities";

const { width, height } = Dimensions.get("window");

const AddStore = ({ navigation }) => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const pickerSelectStyles = StyleSheet.create({
    inputAndroid: [
      GeneralStyle.TextInput,
      {
        fontWeight: "500",
        paddingRight: 30, // to ensure the text is never behind the icon
        marginTop: 0,
        height: "auto",
        color: Colors.black,
        width: width * 0.9,
      },
    ],
    placeholder: {
      color: Colors.ash,
    },
  });

  // Function to filter cities based on the selected state
  const filteredCities = selectedState
    ? Cities.filter((city) => city.state === selectedState)
    : [];

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
          {/* header */}
          <Header navigation={navigation} title="Add new store" />
          {/* form */}
          {/* store name */}
          <View style={{ marginTop: 75 }}>
            <Text
              style={[
                GeneralStyle.MediumText,
                { color: Colors.black, marginLeft: 10 },
              ]}
            >
              Name of Store
            </Text>
            <View style={[GeneralStyle.TextInputView, { marginTop: 10 }]}>
              <TextInput
                style={GeneralStyle.TextInput}
                placeholder="Enter store name here"
                placeholderTextColor={Colors.ash}
              />
            </View>
          </View>
          {/* state */}
          <Text
            style={[
              GeneralStyle.MediumText,
              { color: Colors.black, marginLeft: 10 },
            ]}
          >
            Choose Store State
          </Text>
          <View style={[GeneralStyle.TextInputView, { marginTop: 10 }]}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedState(value)}
              items={States}
              value={selectedState}
              placeholder={{ label: "Choose state", value: null }}
              style={{
                ...pickerSelectStyles,
              }}
              Icon={() => {
                return <View></View>;
              }}
            />
          </View>
          {/* city */}
          <Text
            style={[
              GeneralStyle.MediumText,
              { color: Colors.black, marginLeft: 10 },
            ]}
          >
            Choose Store City
          </Text>
          <View style={[GeneralStyle.TextInputView, { marginTop: 10 }]}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedCity(value)}
              items={filteredCities}
              value={selectedCity}
              placeholder={{ label: "Choose city", value: null }}
              style={{
                ...pickerSelectStyles,
              }}
              Icon={() => {
                return <View></View>;
              }}
            />
          </View>
          {/* store address */}
          <Text
            style={[
              GeneralStyle.MediumText,
              { color: Colors.black, marginLeft: 10 },
            ]}
          >
            Enter Store Address
          </Text>
          <View style={[GeneralStyle.TextInputView, { marginTop: 10 }]}>
            <TextInput
              style={GeneralStyle.TextInput}
              placeholder="Enter store address"
              placeholderTextColor={Colors.ash}
            />
          </View>
          {/* btn */}
          <View style={{ width: "100%", paddingHorizontal: 50 }}>
            <TouchableOpacity
              style={[
                GeneralStyle.Btn,
                {
                  marginTop: 50,
                  borderRadius: 15,
                  backgroundColor: Colors.midnightBlue,
                },
              ]}
            >
              <Text style={GeneralStyle.RegularText}>Open Store</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddStore;
