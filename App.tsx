import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RatingProvider } from "./store/RatingContext";

/* ==== USER SCREENS ==== */
import HomeScreen from "./screens/user/HomeScreen";
import ToiletDetailScreen from "./screens/user/ToiletDetailScreen";
import PaymentScreen from "./screens/user/PaymentScreen";
import RatingScreen from "./screens/user/RatingScreen";
import ChatAIScreen from "./screens/user/ChatAIScreen";
import QRScannerScreen from "./screens/user/QRScannerScreen";
import SubscriptionScreen from "./screens/user/SubscriptionScreen";
import WalletPaymentScreen from "./screens/user/WalletPaymentScreen";
import UserShopScreen from "./screens/user/UserShopScreen";

/* ==== PROVIDER SCREENS ==== */
import DashboardScreen from "./screens/provider/DashboardScreen";
import FacilityScreen from "./screens/provider/FacilityScreen";
import FinanceScreen from "./screens/provider/FinanceScreen";
import FeedbackScreen from "./screens/provider/FeedbackScreen";
import MaintenanceScreen from "./screens/provider/MaintenanceScreen";
import ReportScreen from "./screens/provider/ReportScreen";
import IncidentScreen from "./screens/provider/IncidentScreen";
import ProviderShopScreen from "./screens/provider/ProviderShopScreen";


/* ==== AUTH SCREENS ==== */
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ================== BOTTOM TABS – USER ================== */
function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Trang chủ") iconName = "home-outline";
          else if (route.name === "Cửa hàng") iconName = "cart-outline";
          else if (route.name === "Chat AI") iconName = "chatbubble-ellipses-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Cửa hàng" component={UserShopScreen} />
      <Tab.Screen name="Chat AI" component={ChatAIScreen} />
    </Tab.Navigator>
  );
}

/* ================== BOTTOM TABS – PROVIDER ================== */
function ProviderTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Điều khiển") {
            iconName = "speedometer-outline";
          } else if (route.name === "Cơ sở vật chất") {
            iconName = "build-outline";
          } else if (route.name === "Tài chính") {
            iconName = "cash-outline";
          } else if (route.name === "Cửa hàng") {
            iconName = "cart-outline";
          } else if (route.name === "Phản hồi") {
            iconName = "chatbubbles-outline";
          } else if (route.name === "Bảo trì") {
            iconName = "construct-outline";
          }

          return (
            <Ionicons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Điều khiển" component={DashboardScreen} />
      <Tab.Screen name="Cơ sở vật chất" component={FacilityScreen} />
      <Tab.Screen name="Tài chính" component={FinanceScreen} />

      <Tab.Screen name="Cửa hàng" component={ProviderShopScreen} />

      <Tab.Screen name="Phản hồi" component={FeedbackScreen} />
      <Tab.Screen name="Bảo trì" component={MaintenanceScreen} />
    </Tab.Navigator>
  );
}


/* ================== ROOT APP ================== */
export default function App() {
  const [role, setRole] = useState<"user" | "provider" | null>(null);

  return (
    <RatingProvider>
      <NavigationContainer>
        <Stack.Navigator>

          {/* ===== KHỐI AUTH – chỉ hiển thị khi chưa chọn role ===== */}
          {!role && (
            <>
              <Stack.Screen
                name="Login"
                options={{ headerShown: false }}   // Ẩn thanh header, chỉ còn UI cánh cửa
              >
                {(props) => <LoginScreen {...props} setRole={setRole} />}
              </Stack.Screen>

              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: "Đăng ký" }}
              />

              <Stack.Screen
                name="Forgot"
                component={ForgotPasswordScreen}
                options={{ title: "Quên mật khẩu" }}
              />
            </>
          )}

          {/* ===== USER ===== */}
          {role === "user" && (
            <>
              <Stack.Screen
                name="UserTabs"
                component={UserTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="ToiletDetail" component={ToiletDetailScreen} />
              <Stack.Screen name="Payment" component={PaymentScreen} />
              <Stack.Screen name="Rating" component={RatingScreen} />
              <Stack.Screen name="QRScanner" component={QRScannerScreen} />
              <Stack.Screen name="Subscription" component={SubscriptionScreen} />
            </>
          )}

          {/* ===== PROVIDER ===== */}
            {role === "provider" && (
        <>
        <Stack.Screen
            name="ProviderTabs"
            component={ProviderTabs}
            options={{ headerShown: false }}
        />
            <Stack.Screen name="FinanceScreen" component={FinanceScreen} />
            <Stack.Screen name="FacilityScreen" component={FacilityScreen} />
            <Stack.Screen name="ReportScreen" component={ReportScreen} />
            <Stack.Screen name="IncidentScreen" component={IncidentScreen} />
        </>
        )}
        </Stack.Navigator>
      </NavigationContainer>
    </RatingProvider>
  );
}
