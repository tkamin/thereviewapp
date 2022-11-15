import { Button } from "react-native";
import AccountScreen from "./AccountScreen";

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate("AccountScreen", { name: "Jane" })}
    />
  );
};
export default HomeScreen;
