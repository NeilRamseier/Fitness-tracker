import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, Icon, PaperProvider } from "react-native-paper";
import HomeScreen from "./components/HomeScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SportsUnitScreen from "./components/SportsUnitScreen";
import CalendarScreen from "./components/CalendarScreen";
import ProfileScreen from "./components/ProfileScreen";

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1A5A41",
    secondary: "#EAE7E7",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTitleStyle: {
                color: theme.colors.secondary,
              },
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="home"
                  color={theme.colors.secondary}
                  size={28}
                />
              ),
            }}
          />
          <Tab.Screen
            name="SportsUnit"
            component={SportsUnitScreen}
            options={{
              tabBarStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTitleStyle: {
                color: theme.colors.secondary,
              },
              title: "Sporteinheit",
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="plus-circle"
                  color={theme.colors.secondary}
                  size={28}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Kalender"
            component={CalendarScreen}
            options={{
              tabBarStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTitleStyle: {
                color: theme.colors.secondary,
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar"
                  color={theme.colors.secondary}
                  size={28}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profil"
            component={ProfileScreen}
            options={{
              tabBarStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTitleStyle: {
                color: theme.colors.secondary,
              },
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="account"
                  color={theme.colors.secondary}
                  size={28}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
