import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import RecentStores from "../../Components/HomeScreen/RecentStores";

const Stores = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* header */}
      <View
        style={{
          width: "100%",
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <MaterialIcons
          name="keyboard-arrow-left"
          size={40}
          color={Colors.midnightBlue}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={[GeneralStyle.ExtraBoldText, { color: Colors.midnightBlue }]}
        >
          Stores
        </Text>
        {/* invisible view */}
        <View style={{ opacity: 0 }}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={40}
            color={Colors.midnightBlue}
          />
        </View>
      </View>
      <View style={{ marginTop: 15, alignItems: "center", marginBottom: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.midnightBlue,
              padding: 25,
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
        </View>
        <Text
          style={[
            GeneralStyle.ExtraBoldText,
            { color: Colors.midnightBlue, fontSize: 30, marginTop: 15 },
          ]}
        >
          Your Stores
        </Text>
      </View>
      <RecentStores />
    </SafeAreaView>
  );
};

export default Stores;
