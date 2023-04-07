import * as React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import PlatformReviewList from "../components/PlatformReviewList";

const Details = ({ item }) => {
  var reviews = {};

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={item.icon} style={[styles.icon]} />
        <View style={[styles.info]}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.containerreview]}>
            <Text style={[styles.text]}>
              Durbar incorporates quality ingredients to our receipes, offering
              family style food which are prepares with sensitivity and care.
              Our team speaializes in home made authentic selection from Nepal,
              India. We belive in authentic and quality food. By the perfect miz
              and blends of all best spices we always try to spice up your life.
            </Text>
            <Text style={[styles.contact]}>(970) 363-7081</Text>
            <Text style={[styles.contact]}>http://www.durbarbistro.com/</Text>
            <Text style={[styles.contact]}>dummy@durbarbistro.com</Text>
            <Text style={[styles.contact]}>
              {`47 Cooper Creek Way Unit 222
Winter Park, CO 80482`}{" "}
              (<Text style={styles.distance}>{item.distance}</Text>)
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={[styles.separator]} />
        <View style={{ padding: 5 }}></View>
        <View style={styles.reviews}>
          <View>
            <Text style={[styles.header]}>
              {item.reviewcount.toLocaleString()} Total Reviews
            </Text>
          </View>
          <View style={[styles.containerstars]}>
            <Image source={item.stars} />
            <Text style={styles.reviewinfo}>{item.startotal} stars</Text>
          </View>
          <PlatformReviewList reviews={reviews}></PlatformReviewList>
        </View>
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
    backgroundColor: "#fff",
  },
  containerreview: {
    flexDirection: "column",
  },
  containerstars: {
    flexDirection: "row",
    paddingTop: 12,
  },
  text: {
    color: "#464646",
    fontSize: 12,
    marginTop: 2,
    marginLeft: 0,
  },
  contact: {
    color: "#464646",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 0,
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
    color: "red",
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
  reviews: {
    marginLeft: 20,
    flexDirection: "column",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
  },
  header: {
    //fontFamily: "Cubano",
    color: "#FF4B3E",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default CompanyInfoScreen;
