import { Text } from "react-native";

const AccountScreen = ({ navigation, route }) => {
  return (
    <Text>
      This is{" "}
      {route && route.params && route.params.name
        ? route.params.name + "'s"
        : "a"}{" "}
      profile
    </Text>
  );
};

export default AccountScreen;
