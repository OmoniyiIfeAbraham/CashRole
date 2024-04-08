import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GeneralStyle from "../Style/General.style";
import Colors from "../Style/ThemeColors";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const Sellers = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      <ScrollView style={{ flex: 1 }}>
        <Text
          style={[
            GeneralStyle.ExtraBoldText,
            { color: Colors.midnightBlue, marginLeft: 15, fontSize: 30 },
          ]}
        >
          Sellers
        </Text>
        {/* create a seller */}
        <TouchableOpacity
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
          onPress={() => navigation.navigate("CreateSeller")}
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
              <Ionicons
                name="person-add-sharp"
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
              Create a seller
            </Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={46}
            color={Colors.midnightBlue}
          />
        </TouchableOpacity>
        {/* connect seller */}
        <TouchableOpacity
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
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: Colors.midnightBlue,
                paddingHorizontal: 15,
                paddingVertical: 22,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="handshake-o" size={36} color={Colors.white} />
            </View>
            <Text
              style={[
                GeneralStyle.BoldText,
                { color: Colors.midnightBlue, fontSize: 20, marginLeft: 10 },
              ]}
            >
              Connect seller
            </Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={46}
            color={Colors.midnightBlue}
          />
        </TouchableOpacity>
        {/* list of sellers */}
        <TouchableOpacity
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
              <MaterialIcons name="people" size={36} color={Colors.white} />
            </View>
            <Text
              style={[
                GeneralStyle.BoldText,
                { color: Colors.midnightBlue, fontSize: 20, marginLeft: 10 },
              ]}
            >
              List of sellers
            </Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={46}
            color={Colors.midnightBlue}
          />
        </TouchableOpacity>
        {/* withdraw */}
        <TouchableOpacity
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
              <MaterialCommunityIcons
                name="card-multiple"
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
              Withdraw
            </Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={46}
            color={Colors.midnightBlue}
          />
        </TouchableOpacity>
        {/* amount of stores */}
        <TouchableOpacity
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
              <MaterialCommunityIcons
                name="store"
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
              Amount of stores
            </Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={46}
            color={Colors.midnightBlue}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sellers;

const styles = StyleSheet.create({});
