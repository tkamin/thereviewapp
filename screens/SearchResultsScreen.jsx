import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import TRASearchBar from "../components/TRASearchBar";
import SearchResultsList from "../components/SearchResultsList";
import * as Location from "expo-location";
import {
  normalizeGooglePlacesSearchResults,
  normalizeTripAdvisorSearchResults,
  mergeResultsOnAddress,
  mergeResultsOnPhoneNumber,
  mergeGoogleDetailsIntoResults,
} from "../utils/normalizers";
import {
  useGoogleNearbySearch,
  useGoogleDetails,
  fetchGoogleDetails,
} from "../hooks/useGooglePlaces";
import {
  useTripAdvisorSearch,
  useTripAdvisorPhoneSearch,
} from "../hooks/useTripAdvisor";

const SearchResultsScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  var searchResults = [];

  const { googleData, loading1, error1 } = useGoogleNearbySearch(
    route.params.searchText,
    location
  );
  searchResults = normalizeGooglePlacesSearchResults(googleData, location);
  searchResults = searchResults.filter((item) => {
    if (item === undefined || item.rating_count === 0) {
      return false;
    }

    return true;
  });
  searchResults = searchResults.slice(0, 10);
  // TODO: move useGoogleDetails calls into the .then in useGoogleNearbySearch
  var googleDetails = useGoogleDetails(searchResults);
  searchResults = mergeGoogleDetailsIntoResults(searchResults, googleDetails);

  //console.log(JSON.stringify(searchResults));

  const { tripAdvisorData, loading, error2 } = useTripAdvisorSearch(
    route.params.searchText,
    location
  );
  searchResults = mergeResultsOnPhoneNumber(searchResults, tripAdvisorData);

  searchResults = searchResults.filter((item) => {
    if (item === undefined || item.rating_count == 0) {
      return false;
    }

    return true;
  });

  // identify google only results
  var googleOnly = searchResults.filter((item) => {
    if (
      item === undefined ||
      item.sources === undefined ||
      item.sources.length === 2
    ) {
      return false;
    }

    if (item.sources.length === 1 && item.sources[0].name === "Google") {
      return true;
    }

    return false;
  });

  console.log("GOOGLE ONLY: " + googleOnly.length);
  // backfill TA: basically need to run search and then details for each phone number
  const tripAdvisorPhoneResults = useTripAdvisorPhoneSearch(
    googleOnly,
    location
  );
  searchResults = mergeResultsOnPhoneNumber(
    searchResults,
    tripAdvisorPhoneResults
  );

  return (
    <View style={[styles.container]}>
      <View style={{ padding: 10 }}></View>
      <View style={{ width: "100%", flex: 1 }}>
        <Image
          source={require("../assets/images/logo-small.png")}
          style={{
            width: 276,
            height: 50,
            alignSelf: "center",
            marginLeft: -20,
          }}
        />
        <View style={{ padding: 10 }}></View>
        <TRASearchBar searchText={route.params.searchText} />
        <View style={{ padding: 10 }}></View>
        <View style={[styles.separator]} />
        <View style={{ padding: 5 }}></View>
        <View>
          <Text style={[styles.header]}>Restaurant Reviews</Text>
        </View>
        <SearchResultsList results={searchResults} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minHeight: "100%",
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
    marginLeft: 20,
  },
});

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "Durbar - Nepalese & Indian Bistro",
    icon: require("../assets/images/example-icon1.png"),
    stars: require("../assets/images/5stars.png"),
    rating: 5,
    rating_count: 231,
    review_source_count: 2,
    distance: "6.4 mi",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Randi's Grill & Pub",
    icon: require("../assets/images/example-icon2.png"),
    stars: require("../assets/images/5stars.png"),
    rating: 5,
    rating_count: 12345,
    review_source_count: 3,
    distance: "6.1 mi",
  },
];

const GOOGLE = {
  html_attributions: [],
  next_page_token:
    "AZose0lPuvki4YIjnqxfAevE53luI5cdkY_oZPKnRqZFQJIMs-rrdItNsNUFr-wJgipsgN-21YlTGD--zma-r_gwqe1S5OhbG9HIVPkcZ1gRRsY1dzGTF_Wfl5JgS7Or49OhxquM_FFn4HbriIlXFfaI3ZNBkMpke83-OqmZFjzyR5b69Hjpiis-Nw-pk4TDjbKWNJ4d9_lRo659CCu8t5orI6lJekcGQm62KyK_LGIMrUohjQKwJHPji2uG85sVYqEoE-I4yv7rihSqUInAS8SNjF2XCufPkUWOHvUlac8ldPpViOXujj2uOvzu2tWjDbj_rveI4f0GEt1NyITtO0LGL1hpbbTCPQgJTz3gGz5LYHyvUs8AURDlQGsohiyXIQCfvlnI6pDrVidKnRJ-uV6ioWnRS76wnDVcKGrD68XsmDRi9UDl9xkNMTF8-miP",
  results: [
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9679716,
          lng: -105.7831853,
        },
        viewport: {
          northeast: {
            lat: 39.9695931802915,
            lng: -105.78158705,
          },
          southwest: {
            lat: 39.9668952197085,
            lng: -105.78564805,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Devil's Thumb Ranch Resort & Spa",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1334,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/111438596264398423591"\u003eDevil&#39;s Thumb Ranch Resort &amp; Spa\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0nqT0jX4Nmof2_EJ-AAywylOLUzwA_QnMBu9ujiH2g1KkQP7VfqlHGEhnuDmB0uFmRWT1P9D4Gx6o6_JL04ZKsQ0XxawnBj8NxsytmylSlmjB-rb_OkbhsPwBI1MLW_IrGYSLkCtN6-CKVonMfAg2bfvLz2kt-VlOLB6RYRQ3KWgfdp",
          width: 2000,
        },
      ],
      place_id: "ChIJLz2SkEwzaocR2XqqxRp-yqI",
      plus_code: {
        compound_code: "X698+5P Tabernash, CO, USA",
        global_code: "85FPX698+5P",
      },
      rating: 4.6,
      reference: "ChIJLz2SkEwzaocR2XqqxRp-yqI",
      scope: "GOOGLE",
      types: [
        "spa",
        "travel_agency",
        "lodging",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      rating_count: 1452,
      vicinity: "3530 County Road 83, Tabernash",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9184777,
          lng: -105.784211,
        },
        viewport: {
          northeast: {
            lat: 39.9197745802915,
            lng: -105.7830493197085,
          },
          southwest: {
            lat: 39.9170766197085,
            lng: -105.7857472802915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Subway",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/100705908889581520617"\u003eJustin Lavigne\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0knuj0xZkCC5oTDNINJrh1g9Y0JeHNjRjzFP60_lyHNeh-9IGN-nbIYyqbtuN_21Hf7ttrLghFER-ReFXJq4Go9Y38rfv-p6GSQV2CVbegy__UIyfRzV8b23kYw1HFWzHh8HdhM_g-anSd6LcysxwimcqFtkauleJiQQD2VlJ_tJpBE",
          width: 3024,
        },
      ],
      place_id: "ChIJocCuCNM0aocRPYRdFNFY7Ek",
      plus_code: {
        compound_code: "W698+98 Winter Park, CO, USA",
        global_code: "85FPW698+98",
      },
      price_level: 1,
      rating: 3.8,
      reference: "ChIJocCuCNM0aocRPYRdFNFY7Ek",
      scope: "GOOGLE",
      types: [
        "meal_takeaway",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      rating_count: 103,
      vicinity: "78885 U.S. 40, Winter Park",
    },
  ],
  status: "OK",
};

export default SearchResultsScreen;
