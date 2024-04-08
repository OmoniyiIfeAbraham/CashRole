import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useCallback } from "react";
import Colors from "../../Style/ThemeColors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import GeneralStyle from "../../Style/General.style";

const RecentStores = () => {
  const stores = [
    {
      id: 1,
      name: "Glamour Boutique",
      desc: "Fashion Galore",
      phone: "+2349022333991",
    },
    {
      id: 2,
      name: "Tech Innovators",
      desc: "Cutting-edge Gadgets",
      phone: "+2349022333992",
    },
    {
      id: 3,
      name: "Gourmet Delights",
      desc: "Fine Dining Experience",
      phone: "+2349022333993",
    },
    {
      id: 4,
      name: "Sporting Haven",
      desc: "Fitness and Fun",
      phone: "+2349022333994",
    },
    {
      id: 5,
      name: "Home Essentials",
      desc: "Your Home Needs",
      phone: "+2349022333995",
    },
    {
      id: 6,
      name: "Beauty Bliss",
      desc: "Look Stunning",
      phone: "+2349022333996",
    },
    {
      id: 7,
      name: "Bookworm's Paradise",
      desc: "Reading Wonderland",
      phone: "+2349022333997",
    },
    {
      id: 8,
      name: "Pet Kingdom",
      desc: "For Your Furry Friends",
      phone: "+2349022333998",
    },
    {
      id: 9,
      name: "Jewelry Galore",
      desc: "Shine Bright",
      phone: "+2349022333999",
    },
    { id: 10, name: "Toyland", desc: "Fun for Kids", phone: "+2349022333910" },
    {
      id: 11,
      name: "Healthy Bites",
      desc: "Nutritious Treats",
      phone: "+2349022333911",
    },
    {
      id: 12,
      name: "Outdoor Adventure",
      desc: "Explore Nature",
      phone: "+2349022333912",
    },
    {
      id: 13,
      name: "Artisan Crafts",
      desc: "Handmade Creations",
      phone: "+2349022333913",
    },
    {
      id: 14,
      name: "Music Masters",
      desc: "Melodies Galore",
      phone: "+2349022333914",
    },
    {
      id: 15,
      name: "Wellness Oasis",
      desc: "Health and Relaxation",
      phone: "+2349022333915",
    },
    {
      id: 16,
      name: "Vintage Treasures",
      desc: "Timeless Finds",
      phone: "+2349022333916",
    },
    {
      id: 17,
      name: "Game Zone",
      desc: "Playful Entertainment",
      phone: "+2349022333917",
    },
    {
      id: 18,
      name: "Adventure Gear",
      desc: "Gear up for Excitement",
      phone: "+2349022333918",
    },
    {
      id: 19,
      name: "Green Thumb",
      desc: "Gardening Delights",
      phone: "+2349022333919",
    },
    {
      id: 20,
      name: "Cosmic Creations",
      desc: "Universe-inspired Art",
      phone: "+2349022333920",
    },
    {
      id: 21,
      name: "Comfort Haven",
      desc: "Relaxation Essentials",
      phone: "+2349022333921",
    },
    {
      id: 22,
      name: "Fashion Forward",
      desc: "Style Redefined",
      phone: "+2349022333922",
    },
  ];

  //   render flat list items
  const renderFlatListItems = useCallback(({ item }) => (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 100,
        backgroundColor: Colors.white,
        elevation: 1,
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View
        style={{ backgroundColor: Colors.ash, borderRadius: 15, padding: 25 }}
      >
        <FontAwesome5 name="store-alt" size={36} color={Colors.black} />
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text style={[GeneralStyle.BoldText, { color: Colors.black }]}>
          {item.name}
        </Text>
        <Text
          style={[
            GeneralStyle.LightText,
            { color: Colors.black, fontSize: 20 },
          ]}
        >
          {item.desc}
        </Text>
        <Text
          style={[
            GeneralStyle.MediumText,
            { color: Colors.black, fontSize: 22 },
          ]}
        >
          {item.phone}
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          borderColor: Colors.ash,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          height: 35,
          borderRadius: 30,
        }}
      >
        <Feather name="arrow-right" size={24} color={Colors.ash} />
      </View>
    </TouchableOpacity>
  ));
  return (
    <View style={{ paddingVertical: 5, flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={stores}
        keyExtractor={(item) => item.id}
        renderItem={renderFlatListItems}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default RecentStores;
