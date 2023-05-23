import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "./screens/AccountScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchResultsScreen from "./screens/SearchResultsScreen";
import CompanyInfoScreen from "./screens/CompanyInfoScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Location from "expo-location";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={SearchStackScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("./assets/images/icons/home3x.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("./assets/images/icons/user3x.png")}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
const SearchStack = createNativeStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchHome"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{ title: "Search Results", tabBarStyle: { display: "none" } }}
      />
      <SearchStack.Screen
        name="CompanyInfo"
        component={CompanyInfoScreen}
        options={{ title: "Company Info", tabBarStyle: { display: "none" } }}
      />
    </SearchStack.Navigator>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
