import * as React from "react";
import { SearchBar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const TRASearchBar = ({ searchText }) => {
  const [value, setValue] = React.useState(searchText);
  const navigation = useNavigation();

  return (
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
        navigation.navigate("SearchResults", { searchText: value });
      }}
      value={value}
    />
  );
};

export default TRASearchBar;
