import * as React from "react";
import { View, Text, Image, TextInput, StyleSheet, Button } from "react-native";
import { ListItem } from "@rneui/themed";
import TRASearchBar from "../components/TRASearchBar";

const SearchResultsScreen = ({ navigation, route }) => {
  return (
    <View style={[styles.container]}>
      <View style={{ padding: 10 }}></View>
      <View style={{ width: "100%" }}>
        <Image
          source={require("../assets/images/logo-small.png")}
          style={{
            width: 276,
            height: 50,
            alignSelf: "center",
            marginLeft: -20,
          }}
        />
        <View style={{ padding: 10 }}></View>
        <TRASearchBar
          navigation={navigation}
          searchText={route.params.searchText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
export default SearchResultsScreen;
