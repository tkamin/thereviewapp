import * as React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { ListItem } from "@rneui/themed";
import TRASearchBar from "../components/TRASearchBar";
import SearchResultsList from "../components/SearchResultsList";

const Details = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image source={item.icon} style={[styles.icon]} />
      <View style={[styles.info]}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={[styles.containerreview]}>
          <Image source={item.stars} />
          <Text style={styles.reviewinfo}>{item.startotal}</Text>
        </View>
        <Text style={styles.distance}>
          {/* TODO: for android, in your android/app/build.gradle replace def jscFlavor = 'org.webkit:android-jsc-intl:+' */}
          {item.reviewcount.toLocaleString()} reviews ({item.reviewsourcecount}{" "}
          sources)
        </Text>
        <Text style={styles.distance}>{item.distance}</Text>
      </View>
    </View>
  );
};

const CompanyInfoScreen = ({ navigation, route }) => {
  let company = route.params.company;

  return (
    <View style={[styles.container]}>
      <Details item={company} />
    </View>
  );
};

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
});

export default CompanyInfoScreen;
