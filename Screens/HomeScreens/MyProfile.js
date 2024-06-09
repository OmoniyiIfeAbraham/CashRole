import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../Components/Header/Header";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const MyProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Function to retrieve data
  async function getItem(item1Key, item2Key, item3Key, item4Key, item5Key) {
    try {
      const [item1Value, item2Value, item3Value, item4Value, item5Value] =
        await Promise.all([
          AsyncStorage.getItem(item1Key),
          AsyncStorage.getItem(item2Key),
          AsyncStorage.getItem(item3Key),
          AsyncStorage.getItem(item4Key),
          AsyncStorage.getItem(item5Key),
        ]);

      if (
        item1Value !== null ||
        item2Value !== null ||
        item3Value !== null ||
        item4Value !== null ||
        item5Value !== null
      ) {
        // Items found in AsyncStorage
        console.log("Item 1:", item1Value);
        console.log("Item 2:", item2Value);
        console.log("Item 3:", item3Value);
        console.log("Item 4:", item4Value);
        console.log("Item 5:", item5Value);
        return {
          item1: item1Value,
          item2: item2Value,
          item3: item3Value,
          item4: item4Value,
          item5: item5Value,
        };
      } else {
        // One or both items not found
        console.log("One or all items not found");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving items:", error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const items = await getItem(
        "fName",
        "lName",
        "address",
        "Phone",
        "Email"
      );
      if (items) {
        setName(items.item1 + " " + items.item2);
        setAddress(items.item3);
        setPhone(items.item4);
        setEmail(items.item5);
      }
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* header */}
      <Header navigation={navigation} title="My Profile" />
      {/* transaction */}
      <View style={{ marginTop: 25, height: "10%" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.black, marginRight: 20 },
            ]}
          >
            Total Transaction
          </Text>
        </View>
        <Text
          style={[GeneralStyle.BoldText, { color: Colors.black, fontSize: 30 }]}
        >
          NGN100,000.00
        </Text>
      </View>
      {/* profit */}
      <View style={{ marginTop: 15, height: "10%" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.black, marginRight: 20 },
            ]}
          >
            Total Profit
          </Text>
        </View>
        <Text
          style={[GeneralStyle.BoldText, { color: Colors.black, fontSize: 30 }]}
        >
          NGN5,000.00
        </Text>
      </View>
      {/* details */}
      <View
        style={{
          width: "100%",
          height: "50%",
          backgroundColor: Colors.white,
          elevation: 10,
          borderRadius: 5,
          shadowColor: Colors.black,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          paddingHorizontal: 15,
          marginTop: "5%",
        }}
      >
        {/* user details */}
        <View
          style={{
            height: "75%",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {/* name row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.black,
                  maxWidth: "25%",
                  textAlign: "left",
                },
              ]}
            >
              Name
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.mediumSeaGreen,
                  maxWidth: "70%",
                  textAlign: "right",
                },
              ]}
            >
              {name}
            </Text>
          </View>
          {/* dob row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.black,
                  maxWidth: "45%",
                  textAlign: "left",
                },
              ]}
            >
              Date of Birth
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.mediumSeaGreen,
                  maxWidth: "50%",
                  textAlign: "right",
                },
              ]}
            >
              02/07/1990
            </Text>
          </View>
          {/* address row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.black,
                  maxWidth: "30%",
                  textAlign: "left",
                },
              ]}
            >
              Address
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.mediumSeaGreen,
                  maxWidth: "65%",
                  textAlign: "right",
                },
              ]}
            >
              No. 25 Jadaga Street, Malaysia
            </Text>
          </View>
          {/* phone number row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.black,
                  maxWidth: "50%",
                  textAlign: "left",
                },
              ]}
            >
              Phone Number
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.mediumSeaGreen,
                  maxWidth: "45%",
                  textAlign: "right",
                },
              ]}
            >
              {phone}
            </Text>
          </View>
          {/* email row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.black,
                  maxWidth: "50%",
                  textAlign: "left",
                },
              ]}
            >
              Email Address
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.mediumSeaGreen,
                  maxWidth: "50%",
                  textAlign: "right",
                },
              ]}
            >
              {email}
            </Text>
          </View>
        </View>
        {/* buttons */}
        <View
          style={{
            width: "100%",
            height: "25%",
            backgroundColor: Colors.white,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[
              GeneralStyle.Btn,
              {
                height: "70%",
                width: "45%",
                backgroundColor: Colors.tomato,
              },
            ]}
            // onPress={() => navigation.goBack()}
          >
            <Text
              style={[
                GeneralStyle.MediumText,
                {
                  color: Colors.white,
                },
              ]}
            >
              Delete Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              GeneralStyle.Btn,
              {
                height: "70%",
                width: "45%",
                backgroundColor: Colors.black,
              },
            ]}
            // onPress={() => navigation.navigate("WithdrawalOtp")}
          >
            <Text
              style={[
                GeneralStyle.MediumText,
                {
                  color: Colors.white,
                },
              ]}
            >
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;
