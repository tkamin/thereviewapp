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
import DynamicStarImage from "../components/DynamicStarImage";

const Item = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate("CompanyInfo", { company: item })}
    >
      <View style={styles.item}>
        <Image source={{ uri: item.icon }} style={[styles.icon]} />
        <View style={[styles.info]}>
          <Text style={styles.title}>{item.name}</Text>
          {item.rating_count > 0 && (
            <View style={[styles.containerreview]}>
              <Text style={styles.reviewinfo}>{item.rating}</Text>
              <DynamicStarImage item={item} />
            </View>
          )}
          <Text style={styles.distance}>
            {/* TODO: for android, in your android/app/build.gradle replace def jscFlavor = 'org.webkit:android-jsc-intl:+' */}
            {item.rating_count.toLocaleString()} reviews (
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
        keyExtractor={(item) => (item.id ? item.id : item)}
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
    width: 100,
    height: 100,
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
    marginRight: 5,
  },
  stars: {
    flex: 1,
    flexDirection: "row",
  },
});

export default SearchResultsList;
