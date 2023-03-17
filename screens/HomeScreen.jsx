import * as React from "react";
import { View, Text, Image, TextInput, StyleSheet, Button } from "react-native";
import TRASearchBar from "../components/TRASearchBar";

const HomeScreen = ({ navigation, route }) => {
  return (
    <View style={[styles.container]}>
      <View style={{ width: "100%" }}>
        <Image
          source={require("../assets/images/logo-text.png")}
          style={{
            width: "90%",
            height: 250,
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
        <View style={{ padding: 10 }}></View>
        <TRASearchBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: "#fff",
    //backgroundImage: `url(https://cdn2.hubspot.net/hubfs/4004166/bioticresearch_website_assets/images/search_icon.png)`,
    //paddingLeft: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    alignSelf: "center",
  },
});
export default HomeScreen;
