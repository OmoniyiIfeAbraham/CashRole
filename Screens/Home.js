import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../Style/ThemeColors";
import GeneralStyle from "../Style/General.style";
import WithdrawComponent from "../Components/HomeScreen/WithdrawComponent";
import RecentStores from "../Components/HomeScreen/RecentStores";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 25 }}>
      {/* upper part */}
      <View style={{ height: "100%" }}>
        {/* header */}
        <View
          style={{
            width: "100%",
            height: "15%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                padding: 15,
                backgroundColor: Colors.ash,
                borderRadius: 50,
                marginRight: 10,
              }}
            >
              <FontAwesome5 name="user-alt" size={30} color={Colors.white} />
            </View>
            <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
              Hello, Eclipse
            </Text>
          </View>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => navigation.navigate("Sellers")}
          >
            <MaterialCommunityIcons
              name="bell"
              size={35}
              color={Colors.midnightBlue}
            />
          </TouchableOpacity>
        </View>
        {/* balance */}
        <View style={{ marginTop: 15, height: "10%" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.black, marginRight: 20 },
              ]}
            >
              Total Balance
            </Text>
            <AntDesign
              name="exclamationcircleo"
              size={24}
              color="black"
              onPress={() => setModalVisible(true)}
            />
          </View>
          <Text
            style={[
              GeneralStyle.BoldText,
              { color: Colors.black, fontSize: 30 },
            ]}
          >
            NGN100,000.00
          </Text>
        </View>
        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                elevation: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10 }}>
                Total Balance
              </Text>
              <Text style={{ textAlign: "center" }}>
                This is the sum of all the money in your account, including
                seller money.
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  marginTop: 20,
                  backgroundColor: Colors.midnightBlue,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: Colors.white }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* withdraw */}
        <View style={{ height: "50%" }}>
          <WithdrawComponent
            navigation={navigation}
            title="Available funds"
            amount="5,000"
          />
        </View>
        {/* links */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            // height: "15%",
          }}
        >
          {/* store link */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Colors.midnightBlue,
                padding: 20,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="content-copy"
                size={36}
                color={Colors.white}
              />
            </TouchableOpacity>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.ash, marginTop: 5 },
              ]}
            >
              Store Link
            </Text>
          </View>
          {/* deal */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Colors.midnightBlue,
                paddingVertical: 24,
                paddingHorizontal: 22,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Deal")}
            >
              <FontAwesome5 name="handshake" size={30} color={Colors.white} />
            </TouchableOpacity>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.ash, marginTop: 5 },
              ]}
            >
              Deal
            </Text>
          </View>
          {/* add seller */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Colors.midnightBlue,
                padding: 20,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("CreateSeller")}
            >
              <Ionicons name="person-add" size={36} color={Colors.white} />
            </TouchableOpacity>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.ash, marginTop: 5 },
              ]}
            >
              Add Seller
            </Text>
          </View>
        </View>
      </View>
      {/* recent store
      <View style={{ flex: 1, height: "30%" }}>
        <View style={{ height: "20%" }}>
          <Text
            style={[
              GeneralStyle.BoldText,
              { color: Colors.black, fontSize: 32 },
            ]}
          >
            Recent Stores
          </Text>
        </View>
        <View style={{ height: "80%", flex: 1 }}>
          <RecentStores />
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default Home;
