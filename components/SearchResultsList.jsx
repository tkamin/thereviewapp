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

const Item = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate("CompanyInfo", { company: item })}
    >
      <View style={styles.item}>
        <Image source={item.icon} style={[styles.icon]} />
        <View style={[styles.info]}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={[styles.containerreview]}>
            <Image source={item.stars} />
            <Text style={styles.reviewinfo}>{item.rating}</Text>
          </View>
          <Text style={styles.distance}>
            {/* TODO: for android, in your android/app/build.gradle replace def jscFlavor = 'org.webkit:android-jsc-intl:+' */}
            {item.user_ratings_total.toLocaleString()} reviews (
            {item.review_source_count} sources)
          </Text>
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SearchResultsList = ({ results }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container]}>
      <FlatList
        data={results}
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

export default SearchResultsList;
