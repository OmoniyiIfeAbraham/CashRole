import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../Components/Header/Header";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";

const NotificationDetails = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* header */}
      <Header navigation={navigation} title="Details" />
      {/* main view */}
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {/* product paid for */}
        <View
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          {/* title */}
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.black, textAlign: "center", marginBottom: 10 },
            ]}
          >
            Product paid for
          </Text>
          {/* details */}
          <View
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: Colors.white,
              elevation: 10,
              borderRadius: 5,
              shadowColor: Colors.black,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              paddingHorizontal: 15,
              flexDirection: "row",
              paddingVertical: 5,
            }}
          >
            {/* image view */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "30%",
                height: 100,
              }}
            >
              <Image
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                source={require("./../../assets/Notifications/tomatoes.jpg")}
              />
            </View>
            {/* text view */}
            <View
              style={{
                width: "70%",
                height: 100,
                paddingLeft: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.black, fontSize: 18 },
                ]}
              >
                One bag of tomatoes
              </Text>
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.black, fontSize: 18 },
                ]}
              >
                Alagbaka, Akure
              </Text>
              <Text
                style={[
                  GeneralStyle.BoldText,
                  { color: Colors.black, fontSize: 18 },
                ]}
              >
                NGN10,000
              </Text>
            </View>
          </View>
        </View>

        {/* buyers details */}
        <View
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          {/* title */}
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.black, textAlign: "center", marginBottom: 10 },
            ]}
          >
            Buyers details
          </Text>
          {/* details */}
          <View
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: Colors.white,
              elevation: 10,
              borderRadius: 5,
              shadowColor: Colors.black,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              paddingHorizontal: 15,
              flexDirection: "row",
              paddingVertical: 5,
            }}
          >
            {/* left view */}
            <View
              style={{
                width: "50%",
                height: "auto",
              }}
            >
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.black, fontSize: 18 },
                ]}
              >
                Name
              </Text>
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.black, fontSize: 18 },
                ]}
              >
                Phone number
              </Text>
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.black, fontSize: 18 },
                ]}
              >
                Address
              </Text>
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.black, fontSize: 18 },
                ]}
              >
                Email address
              </Text>
            </View>
            {/* right view */}
            <View
              style={{
                width: "50%",
                height: "auto",
              }}
            >
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.black, fontSize: 18 },
                ]}
              >
                Adeolu Julian
              </Text>
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.black, fontSize: 18 },
                ]}
              >
                07030473033
              </Text>
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.black, fontSize: 18 },
                ]}
              >
                Oshinle, Ijoko
              </Text>
            </View>
          </View>
        </View>

        {/* btn */}
        <View style={{ width: "100%", paddingHorizontal: 50, marginTop: 20 }}>
          <TouchableOpacity
            style={[
              GeneralStyle.Btn,
              {
                borderRadius: 15,
                backgroundColor: Colors.midnightBlue,
              },
            ]}
            onPress={() => navigation.navigate("HomeTabs")}
          >
            <Text style={GeneralStyle.RegularText}>Go to dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationDetails;
