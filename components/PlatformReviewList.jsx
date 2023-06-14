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
import DynamicStarImage from "./DynamicStarImage";

const PlatformReviewCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[{ flex: 1, width: "100%" }]}
      onPress={() => navigation.navigate("CompanyInfo", { company: item })}
    >
      <View style={styles.container}>
        <View style={styles.item}>
          <Image source={item.icon} style={[styles.icon]} />
          <View style={[styles.info]}>
            <View style={[styles.rowwitharrow]}>
              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.distance}>
                  {/* TODO: for android, in your android/app/build.gradle replace def jscFlavor = 'org.webkit:android-jsc-intl:+'00 */}
                  {item.rating_count.toLocaleString()} reviews
                </Text>
              </View>
              <View style={[styles.rightarrow]}>
                <Image
                  source={require("../assets/images/icons/right-arrow.png")}
                  style={[styles.icon]}
                />
              </View>
            </View>
            <View style={[styles.containerreview]}>
              <DynamicStarImage item={item} />
              <Text style={styles.reviewinfo}>{item.rating} stars</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PlatformReviewList = ({ item }) => {
  return (
    <View style={[styles.container]}>
      <FlatList
        style={{
          flex: 1,
          width: "100%",
          marginTop: 20,
        }}
        data={item.sources}
        renderItem={({ item }) => <PlatformReviewCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "The Review App",
    icon: require("../assets/images/icons/small-tra.png"),
    stars: require("../assets/images/5stars.png"),
    rating: 5,
    rating_count: 231,
    review_source_count: 2,
    distance: "6.4 mi",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Google",
    icon: require("../assets/images/icons/small-google.png"),
    stars: require("../assets/images/5stars.png"),
    rating: 5,
    rating_count: 12345,
    review_source_count: 3,
    distance: "6.1 mi",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Yelp",
    icon: require("../assets/images/icons/small-yelp.png"),
    stars: require("../assets/images/4.5stars.png"),
    rating: 4.6,
    rating_count: 1111,
    review_source_count: 3,
    distance: "6.2 mi",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
    name: "Trust Pilot",
    icon: require("../assets/images/icons/small-tra.png"),
    stars: require("../assets/images/4.5stars.png"),
    rating: 4.5,
    rating_count: 743,
    review_source_count: 2,
    distance: "5.8 mi",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f64",
    name: "Consumer Affairs",
    icon: require("../assets/images/icons/small-google.png"),
    stars: require("../assets/images/4.5stars.png"),
    rating: 4.5,
    rating_count: 1289,
    review_source_count: 3,
    distance: "6.1 mi",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    name: "Better Business Bureau",
    icon: require("../assets/images/icons/small-yelp.png"),
    stars: require("../assets/images/4.5stars.png"),
    rating: 4.4,
    rating_count: 86,
    review_source_count: 2,
    distance: "6.2 mi",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerreview: {
    flexDirection: "row",
    marginTop: 12,
  },
  item: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 20,
    marginRight: 20,
    paddingVertical: 14,
    paddingLeft: 18,
    flexDirection: "row",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  rowwitharrow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: -1,
  },
  rightarrow: {
    marginLeft: "auto",
    marginTop: 5,
  },
  icon: {
    marginRight: 20,
    marginTop: 5,
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
