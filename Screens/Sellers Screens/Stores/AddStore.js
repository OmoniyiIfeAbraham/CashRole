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
import ErrorHandler from "../../../Components/Auth/ErrorHandler";
import { baseAPIUrl } from "../../../Global/Global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";

const { width, height } = Dimensions.get("window");

const AddStore = ({ navigation, route }) => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { sellerId, Email } = route.params;
  // console.log(sellerId, Email);

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

  const Submit = async () => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/store/auth/add?id=${sellerId}`;
      let data = new FormData();
      data.append("Name", storeName);
      data.append("State", selectedState);
      data.append("City", selectedCity);
      data.append("Address", storeAddress);

      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      if (response.data?.Error === false) {
        SendOtp(response.data?.Store._id, Email);
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: `${response.data.Error}`,
        });
      }
    } catch (error) {
      ErrorHandler(error, navigation);
    } finally {
      setIsLoading(false);
    }
  };

  const SendOtp = async (Id, email) => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/store/auth/add/sendOtp?id=${Id}&Email=${email}`;

      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      // console.log(response.data);

      if (response.data?.Error === false) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "OTP Sent Successfully",
        });
        navigation.replace("OpenStore", { Id, email });
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: `${response.data.Error}`,
        });
      }
    } catch (error) {
      ErrorHandler(error, navigation);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
          {/* header */}
          <Header navigation={navigation} title="Add new store" />
          {/* loader */}
          <LoadingModal Visible={isLoading} />
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
                onChangeText={(text) => setStoreName(text)}
                value={storeName}
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
              onChangeText={(text) => setStoreAddress(text)}
              value={storeAddress}
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
              onPress={Submit}
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
