import * as React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { ListItem } from "@rneui/themed";
import TRASearchBar from "../components/TRASearchBar";
import SearchResultsList from "../components/SearchResultsList";

const SearchResultsScreen = ({ navigation, route }) => {
  var searchResults = {};

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
        <TRASearchBar searchText={route.params.searchText} />
        <View style={{ padding: 10 }}></View>
        <View style={[styles.separator]} />
        <View style={{ padding: 5 }}></View>
        <View>
          <Text style={[styles.header]}>Restaurant Reviews</Text>
        </View>
        <SearchResultsList results={searchResults} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
  },
  header: {
    //fontFamily: "Cubano",
    color: "#FF4B3E",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginLeft: 20,
  },
});
export default SearchResultsScreen;
