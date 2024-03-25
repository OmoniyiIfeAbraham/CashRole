import { StyleSheet } from "react-native";
import Colors from "./ThemeColors";

export default StyleSheet.create({
  ExtraBoldText: {
    fontSize: 24,
    fontFamily: "AlegreyaSans_800ExtraBold",
    color: Colors.white,
  },
  BoldText: {
    fontSize: 24,
    fontFamily: "AlegreyaSans_700Bold",
    color: Colors.white,
  },
  RegularText: {
    fontSize: 24,
    fontFamily: "AlegreyaSans_400Regular",
    color: Colors.white,
  },
  LightText: {
    fontSize: 24,
    fontFamily: "AlegreyaSans_300Light",
    color: Colors.white,
  },
  MediumText: {
    fontSize: 24,
    fontFamily: "AlegreyaSans_500Medium",
    color: Colors.white,
  },
  Btn: {
    width: "100%",
    height: 60,
    backgroundColor: Colors.mediumSeaGreen,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: "blue",
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: "red",
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
  },
  TextInputView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  TextInput: {
    flex: 1,
    color: Colors.black,
  },
});
