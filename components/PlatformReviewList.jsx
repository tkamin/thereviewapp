import * as React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const PlatformReviewCard = ({ item }) => {
  const navigation = useNavigation();

  console.log(item);
  return (
    <View>
      <View style={[styles.separator]} />
      <View style={{ padding: 5 }}></View>
    </View>
  );
  /*
  return (
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate("CompanyInfo", { company: item })}
    >
      <View style={styles.item}>
        <Image source={item.icon} style={[styles.icon]} />
        <View style={[styles.info]}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.containerreview]}>
            <Image source={item.stars} />
            <Text style={styles.reviewinfo}>{item.startotal}</Text>
          </View>
          <Text style={styles.distance}>
            {// TODO: for android, in your android/app/build.gradle replace def jscFlavor = 'org.webkit:android-jsc-intl:+' }
            {item.reviewcount.toLocaleString()} reviews (
            {item.reviewsourcecount} sources)
          </Text>
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  */
};

const PlatformReviewList = ({ reviews }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container]}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <PlatformReviewCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Durbar - Nepalese & Indian Bistro",
    icon: require("../assets/images/example-icon1.png"),
    stars: require("../assets/images/5stars.png"),
    startotal: 5,
    reviewcount: 231,
    reviewsourcecount: 2,
    distance: "6.4 mi",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Randi's Grill & Pub",
    icon: require("../assets/images/example-icon2.png"),
    stars: require("../assets/images/5stars.png"),
    startotal: 5,
    reviewcount: 12345,
    reviewsourcecount: 3,
    distance: "6.1 mi",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Pepe Osaka's Fishtaco Tequila Bar & Grill",
    icon: require("../assets/images/example-icon1.png"),
    stars: require("../assets/images/4.5stars.png"),
    startotal: 4.6,
    reviewcount: 1111,
    reviewsourcecount: 3,
    distance: "6.2 mi",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
    title: "Hernando's Pizza Pub",
    icon: require("../assets/images/example-icon2.png"),
    stars: require("../assets/images/4.5stars.png"),
    startotal: 4.5,
    reviewcount: 743,
    reviewsourcecount: 2,
    distance: "5.8 mi",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f64",
    title: "The Smokehouse BBQ",
    icon: require("../assets/images/example-icon1.png"),
    stars: require("../assets/images/4.5stars.png"),
    startotal: 4.5,
    reviewcount: 1289,
    reviewsourcecount: 3,
    distance: "6.1 mi",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "Rudi's Deli",
    icon: require("../assets/images/example-icon2.png"),
    stars: require("../assets/images/4.5stars.png"),
    startotal: 4.4,
    reviewcount: 86,
    reviewsourcecount: 2,
    distance: "6.2 mi",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerreview: {
    flexDirection: "row",
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
  reviewinfo: {
    color: "#464646",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
  },
});

export default PlatformReviewList;
