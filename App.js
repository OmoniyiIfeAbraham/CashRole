import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useFonts,
  AlegreyaSans_700Bold,
  AlegreyaSans_400Regular,
  AlegreyaSans_800ExtraBold,
  AlegreyaSans_300Light,
  AlegreyaSans_500Medium,
} from "@expo-google-fonts/alegreya-sans";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Colors from "./Style/ThemeColors";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./Screens/Splash";
import Onboarding1 from "./Screens/Onboarding/Onboarding1";
import Onboarding2 from "./Screens/Onboarding/Onboarding2";
import Onboarding3 from "./Screens/Onboarding/Onboarding3";
import Register from "./Screens/Auth/Register";
import Login from "./Screens/Auth/Login";
import Otp from "./Screens/Auth/Otp";
import MainTabNavigator from "./Components/Navigators/MainTabNavigator";
import CreateSeller from "./Screens/Sellers Screens/CreateSeller";
import ConnectSeller from "./Screens/Sellers Screens/ConnectSeller";
import RegisteredSellers from "./Screens/Sellers Screens/RegisteredSellers";
import Withdraw from "./Screens/Sellers Screens/Withdraw";
import { AlertNotificationRoot } from "react-native-alert-notification";
import Stores from "./Screens/Sellers Screens/Stores";
import SellersProfile from "./Screens/Sellers Screens/SellersProfile";
import EditSellerProfile from "./Screens/Sellers Screens/editSellerProfile";
import AddStore from "./Screens/Sellers Screens/Stores/AddStore";
import Forgot from "./Screens/Auth/Forgot Password/Forgot";
import ForgotOtp from "./Screens/Auth/Forgot Password/ForgotOtp";
import Reset from "./Screens/Auth/Forgot Password/Reset";
import ConfirmWithdrawal from "./Screens/Sellers Screens/Withdraw Screens/ConfirmWithdrawal";
import WithdrawalOtp from "./Screens/Sellers Screens/Withdraw Screens/WithdrawalOtp";
import WithdrawSuccess from "./Screens/Sellers Screens/Withdraw Screens/WithdrawSuccess";
import Deal from "./Screens/Deal/Deal";
import DealOtp from "./Screens/Deal/DealOtp";
import SellerProfile from "./Screens/Deal/SellerProfile";
import MyProfile from "./Screens/HomeScreens/MyProfile";
import AddSellerOtp from "./Screens/Sellers Screens/AddSellerOtp";
import OpenStore from "./Screens/Sellers Screens/Stores/OpenStore";
import ManageStore from "./Screens/Sellers Screens/Stores/ManageStore";
import Notification from "./Screens/Notifications/Notification";
import NotificationDetails from "./Screens/Notifications/NotificationDetails";
import StoreLink from "./Screens/HomeScreens/StoreLink";
import Store from "./Screens/Sellers Screens/Stores/Store";
import AddProduct from "./Screens/Sellers Screens/Stores/Products/AddProduct";
import AddProduct2 from "./Screens/Sellers Screens/Stores/Products/AddProduct2";
import ProductConfirm from "./Screens/Sellers Screens/Stores/Products/ProductConfirm";
import AddproductOtp from "./Screens/Sellers Screens/Stores/Products/AddproductOtp";
import AddProductSuccessfull from "./Screens/Sellers Screens/Stores/Products/AddProductSuccessfull";
import ConfirmDeleteProduct from "./Screens/Sellers Screens/Stores/Products/ConfirmDeleteProduct";
import DeleteProductOtp from "./Screens/Sellers Screens/Stores/Products/DeleteProductOtp";
import DeleteProductSuccessfull from "./Screens/Sellers Screens/Stores/Products/DeleteProductSuccessfull";
import Update from "./Screens/Auth/Update";
import HistoryNotifications from "./Screens/Sellers Screens/History";
import EditSeller from "./Screens/Sellers Screens/Auth/Edit";
import EditProduct from "./Screens/Sellers Screens/Stores/Products/EditProduct";

const Stack = createNativeStackNavigator();

export default function App() {
  // loading fonts
  let [fontsLoaded] = useFonts({
    AlegreyaSans_700Bold,
    AlegreyaSans_400Regular,
    AlegreyaSans_800ExtraBold,
    AlegreyaSans_300Light,
    AlegreyaSans_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <AlertNotificationRoot theme="light">
      <SafeAreaProvider style={{ flex: 1, backgroundColor: Colors.white }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="splash"
            screenOptions={{ headerShown: false, animation: "slide_from_left" }}
          >
            <Stack.Screen name="splash" component={Splash} />

            {/* Onboarding */}
            <Stack.Group>
              <Stack.Screen name="Onboarding1" component={Onboarding1} />
              <Stack.Screen name="Onboarding2" component={Onboarding2} />
              <Stack.Screen name="Onboarding3" component={Onboarding3} />
            </Stack.Group>

            {/* Auth */}
            <Stack.Group>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Otp" component={Otp} />
              <Stack.Screen name="Forgot" component={Forgot} />
              <Stack.Screen name="ForgotOtp" component={ForgotOtp} />
              <Stack.Screen name="Reset" component={Reset} />
              <Stack.Screen name="Update" component={Update} />
            </Stack.Group>

            {/* Home Screen */}
            <Stack.Screen name="HomeTabs" component={MainTabNavigator} />

            {/* Home Screens */}
            <Stack.Group>
              <Stack.Screen name="MyProfile" component={MyProfile} />
              <Stack.Screen name="StoreLink" component={StoreLink} />
            </Stack.Group>

            {/* Sellers Screens */}
            <Stack.Group>
              <Stack.Screen name="CreateSeller" component={CreateSeller} />
              <Stack.Screen name="ConnectSeller" component={ConnectSeller} />
              <Stack.Screen name="EditSeller" component={EditSeller} />
              <Stack.Screen
                name="RegisteredSellers"
                component={RegisteredSellers}
              />
              <Stack.Screen name="Withdraw" component={Withdraw} />
              <Stack.Screen name="Stores" component={Stores} />
              <Stack.Screen name="SellersProfile" component={SellersProfile} />
              <Stack.Screen
                name="EditSellerProfile"
                component={EditSellerProfile}
              />
              <Stack.Screen
                name="ConfirmWithdrawal"
                component={ConfirmWithdrawal}
              />
              <Stack.Screen name="WithdrawalOtp" component={WithdrawalOtp} />
              <Stack.Screen
                name="WithdrawSuccess"
                component={WithdrawSuccess}
              />
              <Stack.Screen name="AddSellerOtp" component={AddSellerOtp} />
              <Stack.Screen
                name="HistoryNotifications"
                component={HistoryNotifications}
              />
            </Stack.Group>

            {/* Stores Screens */}
            <Stack.Group>
              <Stack.Screen name="AddStore" component={AddStore} />
              <Stack.Screen name="OpenStore" component={OpenStore} />
              <Stack.Screen name="ManageStore" component={ManageStore} />
              <Stack.Screen name="Store" component={Store} />
            </Stack.Group>

            {/* Product Screens */}
            <Stack.Group>
              <Stack.Screen name="AddProduct" component={AddProduct} />
              <Stack.Screen name="AddProduct2" component={AddProduct2} />
              <Stack.Screen name="ProductConfirm" component={ProductConfirm} />
              <Stack.Screen name="AddProductOtp" component={AddproductOtp} />
              <Stack.Screen
                name="AddProductSuccessfull"
                component={AddProductSuccessfull}
              />
              <Stack.Screen
                name="ConfirmDeleteProduct"
                component={ConfirmDeleteProduct}
              />
              <Stack.Screen
                name="DeleteProductOtp"
                component={DeleteProductOtp}
              />
              <Stack.Screen
                name="DeleteProductSuccessfull"
                component={DeleteProductSuccessfull}
              />
              <Stack.Screen name="EditProduct" component={EditProduct} />
            </Stack.Group>

            {/* Deal Screens */}
            <Stack.Group>
              <Stack.Screen name="Deal" component={Deal} />
              <Stack.Screen name="DealOtp" component={DealOtp} />
              <Stack.Screen name="SellerProfile" component={SellerProfile} />
            </Stack.Group>

            {/* Notification Screens */}
            <Stack.Group>
              <Stack.Screen name="Notification" component={Notification} />
              <Stack.Screen
                name="NotificationDetails"
                component={NotificationDetails}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </AlertNotificationRoot>
  );
}
