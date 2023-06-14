import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import PlatformReviewList from "../components/PlatformReviewList";
import DynamicStarImage from "../components/DynamicStarImage";
import { normalizeGooglePlacesDetailsAddress } from "../utils/normalizers";

const Details = ({ item }) => {
  const [data, setData] = useState(null);

  var uri =
    "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyD0hLVwxYWa2zWSJHtFnlh7CEqygEYnfvc";
  uri += "&place_id=" + item.id;

  if (data === null) {
    console.log(uri);
    fetch(uri)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={{ uri: item.icon }} style={[styles.icon]} />
        <View style={[styles.info]}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={[styles.containerreview]}>
            {data &&
              data.result &&
              data.result.editorial_summary &&
              data.result.editorial_summary.overview && (
                <Text style={[styles.text]}>
                  {data.result.editorial_summary.overview}
                </Text>
              )}
            {data && data.result && data.result.formatted_phone_number && (
              <Text style={[styles.contact]}>
                {data.result.formatted_phone_number}
              </Text>
            )}
            {data && data.result && data.result.website && (
              <Text style={[styles.contact]}>{data.result.website}</Text>
            )}
            {/*<Text style={[styles.contact]}>dummy@durbarbistro.com</Text>*/}
            {data &&
              data.result &&
              normalizeGooglePlacesDetailsAddress(data) && (
                <Text style={[styles.contact]}>
                  {normalizeGooglePlacesDetailsAddress(data)}(
                  <Text style={styles.distance}>{item.distance}</Text>)
                </Text>
              )}
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={[styles.separator]} />
        <View style={{ padding: 5 }}></View>
        <View style={styles.reviews}>
          <View>
            <Text style={[styles.header]}>
              {item.rating_count.toLocaleString()} Total Reviews
            </Text>
          </View>
          <View style={[styles.containerstars]}>
            <DynamicStarImage item={item} />
            <Text style={styles.reviewinfo}> {item.rating} stars</Text>
          </View>
          <PlatformReviewList item={item}></PlatformReviewList>
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
    flex: 1,
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
