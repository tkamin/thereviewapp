import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Button,
} from "react-native";
import AccountScreen from "./AccountScreen";

const HomeScreen = ({ navigation, route }) => {
  /*
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate("AccountScreen", { name: "Jane" })}
    />
  );
  */
  return (
    <View style={[styles.container]}>
      <Image
        source={require("../assets/images/logo-text.png")}
        style={{
          flex: 1,
          width: "90%",
          height: 200,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
      <Text
        style={{
          flex: 1,
          alignSelf: "center",
        }}
      >
        Search bar goes here to start
      </Text>
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
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});
export default HomeScreen;
