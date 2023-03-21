import * as React from "react";
import { View, FlatList, StyleSheet, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Item = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image source={item.icon} style={[styles.icon]} />
      <View style={[styles.info]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.stars} style={[styles.icon]} />
        <Text style={styles.distance}>{item.distance}</Text>
      </View>
    </View>
  );
};

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Durbar - Nepalese & Indian Bistro",
    icon: require("../assets/images/example-icon1.png"),
    stars: require("../assets/images/5stars.png"),
    distance: "6.4 mi",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Randi's Grill & Pub",
    icon: require("../assets/images/example-icon2.png"),
    stars: require("../assets/images/5stars.png"),
    distance: "6.1 mi",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Pepe Osaka's Fishtaco Tequila Bar & Grill",
    icon: require("../assets/images/example-icon1.png"),
    stars: require("../assets/images/4.5stars.png"),
    distance: "6.2 mi",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
    title: "Hernando's Pizza Pub",
    icon: require("../assets/images/example-icon2.png"),
    stars: require("../assets/images/4.5stars.png"),
    distance: "5.8 mi",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f64",
    title: "The Smokehouse BBQ",
    icon: require("../assets/images/example-icon1.png"),
    stars: require("../assets/images/4.5stars.png"),
    distance: "6.1 mi",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "Rudi's Deli",
    icon: require("../assets/images/example-icon2.png"),
    stars: require("../assets/images/4.5stars.png"),
    distance: "6.2 mi",
  },
];

const SearchResultsList = ({ results }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container]}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  icon: {
    marginRight: 20,
  },
  info: {
    flex: 1,
  },
  title: {
    color: "#464646",
    fontWeight: "bold",
    fontSize: 16,
  },
  distance: {
    color: "#464646",
    fontSize: 12,
    marginTop: 3,
    marginLeft: 1,
  },
});

export default SearchResultsList;
