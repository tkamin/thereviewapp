import * as React from "react";
import { View, Text, Image, TextInput, StyleSheet, Button } from "react-native";
import AccountScreen from "./AccountScreen";
import { ListItem, SearchBar } from "@rneui/themed";

const SearchResultsScreen = ({ navigation, route }) => {
  const [value, setValue] = React.useState(route.params.search);

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
        <SearchBar
          platform="default"
          containerStyle={{
            backgroundColor: "#fff",
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 15,
            paddingVertical: 0,
            paddingHorizontal: 10,
            alignSelf: "center",
            width: 300,
          }}
          inputContainerStyle={{ backgroundColor: "#fff" }}
          inputStyle={{
            borderColor: "#fff",
            color: "#000",
          }}
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          lightTheme
          loadingProps={{}}
          onChangeText={(newVal) => setValue(newVal)}
          onClearText={() => console.log(`User cleared ${value}`)}
          placeholder="Search for restaurants..."
          placeholderTextColor="gray"
          cancelButtonTitle="Cancel"
          cancelButtonProps={{}}
          onCancel={() => console.log(`User cancelled ${value}`)}
          onSubmitEditing={() => {
            navigation.navigate("SearchResults", { search: value });
          }}
          value={value}
        />
        {/*<TextInput style={styles.input} placeholder="Search for restaurants" />*/}
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
