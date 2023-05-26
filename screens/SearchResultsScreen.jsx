import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { ListItem } from "@rneui/themed";
import TRASearchBar from "../components/TRASearchBar";
import SearchResultsList from "../components/SearchResultsList";
import * as Location from "expo-location";
import { normalizeGooglePlacesSearchResults } from "../utils/normalizers";

const SearchResultsScreen = ({ navigation, route }) => {
  const [data, setData] = useState(null);

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

  if (
    data === null &&
    location !== null &&
    location.coords !== null &&
    location.coords.latitude !== null &&
    location.coords.longitude !== null
  ) {
    var uri =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=10000&type=restaurant&key=AIzaSyD0hLVwxYWa2zWSJHtFnlh7CEqygEYnfvc";
    if (
      route.params.searchText &&
      route.params.searchText !== null &&
      route.params.searchText !== ""
    ) {
      uri += "&keyword=" + route.params.searchText;
    }
    uri +=
      "&location=" +
      location.coords.latitude +
      "%2C" +
      location.coords.longitude;

    console.log(uri);
    fetch(uri)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error(error);
      });
  }

  var searchResults = [];
  /*
  var searchResults = DATA;
  searchResults = normalizeGooglePlacesSearchResults(GOOGLE);
  */
  searchResults = normalizeGooglePlacesSearchResults(data);

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
    user_ratings_total: 231,
    review_source_count: 2,
    distance: "6.4 mi",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Randi's Grill & Pub",
    icon: require("../assets/images/example-icon2.png"),
    stars: require("../assets/images/5stars.png"),
    rating: 5,
    user_ratings_total: 12345,
    review_source_count: 3,
    distance: "6.1 mi",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Pepe Osaka's Fishtaco Tequila Bar & Grill",
    icon: require("../assets/images/example-icon1.png"),
    stars: require("../assets/images/4.5stars.png"),
    rating: 4.6,
    user_ratings_total: 1111,
    review_source_count: 3,
    distance: "6.2 mi",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
    name: "Hernando's Pizza Pub",
    icon: require("../assets/images/example-icon2.png"),
    stars: require("../assets/images/4.5stars.png"),
    rating: 4.5,
    user_ratings_total: 743,
    review_source_count: 2,
    distance: "5.8 mi",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f64",
    name: "The Smokehouse BBQ",
    icon: require("../assets/images/example-icon1.png"),
    stars: require("../assets/images/4.5stars.png"),
    rating: 4.5,
    user_ratings_total: 1289,
    review_source_count: 3,
    distance: "6.1 mi",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    name: "Rudi's Deli",
    icon: require("../assets/images/example-icon2.png"),
    stars: require("../assets/images/4.5stars.png"),
    rating: 4.4,
    user_ratings_total: 86,
    review_source_count: 2,
    distance: "6.2 mi",
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
      user_ratings_total: 1452,
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
      user_ratings_total: 103,
      vicinity: "78885 U.S. 40, Winter Park",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9278488,
          lng: -105.7892379,
        },
        viewport: {
          northeast: {
            lat: 39.9293511802915,
            lng: -105.7878688197085,
          },
          southwest: {
            lat: 39.9266532197085,
            lng: -105.7905667802915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/movies-71.png",
      icon_background_color: "#13B5C7",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/movie_pinlet",
      name: "The Foundry Cinema & Bowl",
      opening_hours: {
        open_now: false,
      },
      photos: [
        {
          height: 3000,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/115271874387137128669"\u003eGretchen Skipworth\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0lICaE069MtbRZA48eCFbG-HZcgAb3tT6UzjpGTx0GwrcDRA1sI7IIpbelBqKt0AvbBoYfwo3lT0rVMGB_VUcOLpZu6euFbcR10oF68WU4Bb3RGU4jQczHxef9SSGO9X-90n0jOyqnkWxp449UleXupSkWY9ewqviXnuNtH0FxcUaJN",
          width: 4000,
        },
      ],
      place_id: "ChIJnwI1E8k0aocRVT6vPzI3Df0",
      plus_code: {
        compound_code: "W6H6+48 Fraser, CO, USA",
        global_code: "85FPW6H6+48",
      },
      rating: 4.3,
      reference: "ChIJnwI1E8k0aocRVT6vPzI3Df0",
      scope: "GOOGLE",
      types: [
        "movie_theater",
        "bowling_alley",
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 711,
      vicinity: "22 Second Street, Fraser",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.946077,
          lng: -105.815557,
        },
        viewport: {
          northeast: {
            lat: 39.9474544802915,
            lng: -105.8140974197085,
          },
          southwest: {
            lat: 39.9447565197085,
            lng: -105.8167953802915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Sharky's Eatery",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3664,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/118237128243637152910"\u003eBen Yamamoto\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0my1Q9e1mn0dRzUWiUCAV77RYvFVGvQPzHp0gaohiVsitM90sr1rhma1ty6IAvYWIUz04eAUut6bpEAv8ekxmaV6Vgbvg0tk6da_p8HDUAOhn_MvkVLXgNjnSdwD3kYxO6TAKLHdNZLu4ysGQKaZJYXSmROCgNHxxjHrMta9TQHUWv2",
          width: 5392,
        },
      ],
      place_id: "ChIJfVneEJ00aocRknf5-udWiIw",
      plus_code: {
        compound_code: "W5WM+CQ Fraser, CO, USA",
        global_code: "85FPW5WM+CQ",
      },
      price_level: 2,
      rating: 4.6,
      reference: "ChIJfVneEJ00aocRknf5-udWiIw",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 895,
      vicinity: "221 Doc Susie Avenue, Fraser",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9180289,
          lng: -105.7840571,
        },
        viewport: {
          northeast: {
            lat: 39.91934183029149,
            lng: -105.7825240197085,
          },
          southwest: {
            lat: 39.9166438697085,
            lng: -105.7852219802915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Fraser Valley Hot Dog",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/117637756836365899373"\u003edavid stewart\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0ln3eT6M9i8mwGCkZVlM9OyAIwoHV-ycVqWfLWl15IcJXiiAWShD15I7vLg5SaZsfcNzR7i--ScetnWboyIdDNxwaMkpRy31-OJWuZ_mkjEVhn5mAHfxNBrq8zEIS8x58BqORuLpgpXeJYVqRzWg18-c7oEMQPdZfjVgAU76Bv_H1SS",
          width: 4032,
        },
      ],
      place_id: "ChIJc7N2ctM0aocRQvE_zeSUo1k",
      plus_code: {
        compound_code: "W698+69 Winter Park, CO, USA",
        global_code: "85FPW698+69",
      },
      price_level: 2,
      rating: 4.6,
      reference: "ChIJc7N2ctM0aocRQvE_zeSUo1k",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 326,
      vicinity: "78927 U.S. 40, Winter Park",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9230844,
          lng: -105.7859994,
        },
        viewport: {
          northeast: {
            lat: 39.92460533029149,
            lng: -105.7845814697085,
          },
          southwest: {
            lat: 39.9219073697085,
            lng: -105.7872794302915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
      name: "Randi's Grill & Pub",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 2048,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/117873237457738004069"\u003eRandi&#39;s Grill &amp; Pub\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0lQSvWBVYx2bP431squVWGYrNTESlY7afBwLXeI4tVOVGHhKxlyrvtjxGQdYJZv6I08km16l-mFYzUXoP9bm3tB0CkMna0RtpbIafx75rXPlsgCoQT2NVX3vns_MwSzHWTgXvthxor7TlyBfJLibevDLOQmJRtW_pb0GD4MhvExrvh_",
          width: 1148,
        },
      ],
      place_id: "ChIJzamqvs00aocRu3PCIxnhvoo",
      plus_code: {
        compound_code: "W6F7+6J Winter Park, CO, USA",
        global_code: "85FPW6F7+6J",
      },
      price_level: 2,
      rating: 4.5,
      reference: "ChIJzamqvs00aocRu3PCIxnhvoo",
      scope: "GOOGLE",
      types: [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 1764,
      vicinity: "78521 U.S. 40, Winter Park",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9209721,
          lng: -105.7852398,
        },
        viewport: {
          northeast: {
            lat: 39.9222182802915,
            lng: -105.7840721697085,
          },
          southwest: {
            lat: 39.9195203197085,
            lng: -105.7867701302915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Pepe Osaka's Fishtaco Tequila Bar & Grill",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3456,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/106120252215060661042"\u003ePepe Osaka&#39;s Fishtaco Tequila Bar &amp; Grill\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0nu_e1f5dkcPztbWAwaTwrILFQfaLcY0uTWOnOsRcYSIqJ9v-dpuE4aE8AwiGFH9fkwmu1vL_G7o5446Nfs6vGskNNJPAHcIY2GhNwBcc8Bu4q6y9ZZcnGFxf9lAQx_bL7u0F2Mv_5Vjm93yIr_KAjO61oGlVzlPdq-sLVycTnzZtvA",
          width: 4603,
        },
      ],
      place_id: "ChIJ02PpKbnKa4cRBL0Ea3b9EqU",
      plus_code: {
        compound_code: "W6C7+9W Winter Park, CO, USA",
        global_code: "85FPW6C7+9W",
      },
      price_level: 2,
      rating: 4.5,
      reference: "ChIJ02PpKbnKa4cRBL0Ea3b9EqU",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 604,
      vicinity: "78707 U.S. 40, Winter Park",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9427704,
          lng: -105.8117844,
        },
        viewport: {
          northeast: {
            lat: 39.9442919302915,
            lng: -105.8106015697085,
          },
          southwest: {
            lat: 39.9415939697085,
            lng: -105.8132995302915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Julio's Mexican Grill & Cantina",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/104185238423890109355"\u003eJenny Tavarez\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0n1zxlTH5tJnfAmogEQnRp67m0FGuspGFWapV4mU117w1kVp5XSig_-gwNfcy0uoMCeVoGQBWasWjB_C1VeJjKGpsX8OuiNLEmQxiMzYhkOmM9BrR0QlR329f2eha2hjTyuOc2oCwb6BZaK5wGtH762FUuN8Kuud4oqXixTRa2RE_rZ",
          width: 4032,
        },
      ],
      place_id: "ChIJg6K5Hpw0aocR7bl1TWHI9Vc",
      plus_code: {
        compound_code: "W5VQ+47 Fraser, CO, USA",
        global_code: "85FPW5VQ+47",
      },
      price_level: 2,
      rating: 3.6,
      reference: "ChIJg6K5Hpw0aocR7bl1TWHI9Vc",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 348,
      vicinity: "535 Zerex Street, Fraser",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9434986,
          lng: -105.8121075,
        },
        viewport: {
          northeast: {
            lat: 39.9448029802915,
            lng: -105.8106768697085,
          },
          southwest: {
            lat: 39.94210501970851,
            lng: -105.8133748302915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Wendy's",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/113239938205892328511"\u003eJS 2K\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0kGnJ8V5bbpLw6IlxnMvlijyY2HyZtpYOlJPJS5vy-fvPluw_IOVG6pwTFPEk1i2ZmaA9Nu4iphYbxWPo_TtkAxu1wsMokgYNn7Xu24uxyn8ZQvRjV5JrhUbZtQdaRiFurtm0jN6D9uuwb9rtEfbiU0C9d21BzPXMkclHUrHqeQ0E7c",
          width: 4032,
        },
      ],
      place_id: "ChIJf-2bBZw0aocRV_Rmq_Bbh8E",
      plus_code: {
        compound_code: "W5VQ+95 Fraser, CO, USA",
        global_code: "85FPW5VQ+95",
      },
      price_level: 1,
      rating: 3.8,
      reference: "ChIJf-2bBZw0aocRV_Rmq_Bbh8E",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 589,
      vicinity: "501 Zerex Street, Fraser",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.944789,
          lng: -105.810624,
        },
        viewport: {
          northeast: {
            lat: 39.9461537802915,
            lng: -105.8093413697085,
          },
          southwest: {
            lat: 39.9434558197085,
            lng: -105.8120393302915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Solstice Winter Bistro",
      opening_hours: {
        open_now: false,
      },
      photos: [
        {
          height: 934,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/115701152571431033907"\u003eSolstice Winter Bistro\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0kB4qXkD5qSr4yGjp8rrJwA5tUlqwg36xOWiHesVcSv93D7RWA35lLp9ZHYjzW2yEYa2E0l6aiQwzKAQY7xBp_-h6ZJi-IlmykcnUKE3IkG6sEUQIwzZ19TCq2xHPvou6IV2RYNmt_nzwcQDOXKV15BIvFXODXXWfnjDjiJducoxiXc",
          width: 1400,
        },
      ],
      place_id: "ChIJU7HFkJ40aocR0Vw3Yu97Rdg",
      plus_code: {
        compound_code: "W5VQ+WQ Fraser, CO, USA",
        global_code: "85FPW5VQ+WQ",
      },
      rating: 4.6,
      reference: "ChIJU7HFkJ40aocR0Vw3Yu97Rdg",
      scope: "GOOGLE",
      types: [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 64,
      vicinity: "40 County Road 804 #130, Fraser",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9465295,
          lng: -105.8156717,
        },
        viewport: {
          northeast: {
            lat: 39.9479620802915,
            lng: -105.8143593697085,
          },
          southwest: {
            lat: 39.9452641197085,
            lng: -105.8170573302915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/gas_station-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/gas_pinlet",
      name: "Shell",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3456,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/100418875968102141965"\u003eBrian Spoelhof\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0n-oTecUmCaHNDFWlOcRzZMyYqBEe1O3liP-_i9ksc0-2O0apcnoKniUylDh1WHcRauKdfv_iYnfCrNAq-VdoCtgXzlT4s7SAsF21TgOJWh7MYSxQkbpuboeWdnkM3_DmbpUa7qTGkJDSwnNpnOHNMAbzARGtd_sg0FXRqAlyLLFxVH",
          width: 4608,
        },
      ],
      place_id: "ChIJ2yIRap00aocReLHmyaw5reE",
      plus_code: {
        compound_code: "W5WM+JP Fraser, CO, USA",
        global_code: "85FPW5WM+JP",
      },
      price_level: 2,
      rating: 2.2,
      reference: "ChIJ2yIRap00aocReLHmyaw5reE",
      scope: "GOOGLE",
      types: [
        "gas_station",
        "convenience_store",
        "atm",
        "finance",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 18,
      vicinity: "300 Eisenhower Drive, Fraser",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.930098,
          lng: -105.7901738,
        },
        viewport: {
          northeast: {
            lat: 39.93115963029149,
            lng: -105.7889711697085,
          },
          southwest: {
            lat: 39.92846166970849,
            lng: -105.7916691302915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/gas_station-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/gas_pinlet",
      name: "Shell",
      photos: [
        {
          height: 2988,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/111339897585722160829"\u003eBrent M\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0nQ6c06sUXbddtEAOSVg9TQF3RiblajIBGBRBk46oyc9e4-CGruIOGGsq7zLY7Acu8v5MTLTJHUzg2cywjXTKHGERRafJ_Px85hEdVOArA5CVjuHeSY7OyKLVtzqFktk8RICwCNBrwHQnMvOx76lAB9TQN70AUENj5AsvCXE4CAqiVn",
          width: 5312,
        },
      ],
      place_id: "ChIJAzqhyMk0aocRoJhISq14Jk0",
      plus_code: {
        compound_code: "W6J5+2W Winter Park, CO, USA",
        global_code: "85FPW6J5+2W",
      },
      price_level: 2,
      rating: 3.2,
      reference: "ChIJAzqhyMk0aocRoJhISq14Jk0",
      scope: "GOOGLE",
      types: [
        "gas_station",
        "car_wash",
        "convenience_store",
        "atm",
        "finance",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 10,
      vicinity: "46 Market Street, Winter Park",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9272421,
          lng: -105.7875945,
        },
        viewport: {
          northeast: {
            lat: 39.9279167802915,
            lng: -105.7863602197085,
          },
          southwest: {
            lat: 39.9252188197085,
            lng: -105.7890581802915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Carver's Breakfast & Burgers",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/116822912828498605854"\u003eTennyson Varghese\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0k9DSbB-EZORGczuQ4_sQGB423LcYxrhzZgh0qykEDAvEpZckmFmvQ6sGXclzMovoK1u9M5lTQ5Uy0Wv4_GDC3bzkQ9xgx2RdZ4pFLfM0Bn_T8nf2jAxqhCB_RiYjfJ7qLH35NUkYC0XEmF8HzxvNUjlx3q1Z5yDwrOCQU-lluPpdsX",
          width: 4032,
        },
      ],
      place_id: "ChIJpfNkpc40aocR4sOWAFurMSA",
      plus_code: {
        compound_code: "W6G6+VX Winter Park, CO, USA",
        global_code: "85FPW6G6+VX",
      },
      price_level: 2,
      rating: 4.4,
      reference: "ChIJpfNkpc40aocR4sOWAFurMSA",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 544,
      vicinity: "78259 U.S. 40, Winter Park",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9176313,
          lng: -105.7851049,
        },
        viewport: {
          northeast: {
            lat: 39.91891608029149,
            lng: -105.7835980197085,
          },
          southwest: {
            lat: 39.91621811970849,
            lng: -105.7862959802915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Durbar - Nepalese & Indian Bistro",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1857,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/114799565352427056446"\u003eLizzy Marie (#GlitterGlassesJourney)\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0lNyX9Vc6ivfOGcGntAGXICrQs30STuQ_Str7yU6KQfL6tEwL3pCyrY3x8rbU07OByZA10cEyEsgftX9JBRrMr1MhuRAxQTV8OXzi-AokxU7SFQvqnuiXPpJIPMG-5NGL1I2f_JR3HZ7RGwxKl1R06O3hc8qasLYL5BonzTpbWs7HK8",
          width: 2791,
        },
      ],
      place_id: "ChIJd9V5ntM0aocR99tsVmy6snA",
      plus_code: {
        compound_code: "W697+3X Winter Park, CO, USA",
        global_code: "85FPW697+3X",
      },
      rating: 4.5,
      reference: "ChIJd9V5ntM0aocR99tsVmy6snA",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 406,
      vicinity: "47 Cooper Creek Way #222, Winter Park",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9277413,
          lng: -105.7881205,
        },
        viewport: {
          northeast: {
            lat: 39.9288556802915,
            lng: -105.7865506697085,
          },
          southwest: {
            lat: 39.9261577197085,
            lng: -105.7892486302915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Hernando's Pizza Pub",
      opening_hours: {
        open_now: false,
      },
      photos: [
        {
          height: 316,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/106079821574239199799"\u003eHernando&#39;s Pizza Pub\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0lPnImeFILBhuT8h4lFox3AH_tmqhQ6XHKLOFlEgmx90fKqKcwZYwwiEsqUwJWAdKxGjV6MTRuuUlke_dnBiJ6-ZhoWSkCZOFw3HM5PHBZXN-ov6LkZgsZjiPh__2XUZz5P1DTf5Q2n5FKOfYniDUg8ARQQ0nS0_Yu0NezihZjyWfc",
          width: 400,
        },
      ],
      place_id: "ChIJzfxmWck0aocRH2tkjw_NQ3w",
      plus_code: {
        compound_code: "W6H6+3Q Winter Park, CO, USA",
        global_code: "85FPW6H6+3Q",
      },
      price_level: 2,
      rating: 4.6,
      reference: "ChIJzfxmWck0aocRH2tkjw_NQ3w",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 1512,
      vicinity: "78199 U.S. 40, Winter Park",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.91819539999999,
          lng: -105.7842533,
        },
        viewport: {
          northeast: {
            lat: 39.9195111802915,
            lng: -105.7830087697085,
          },
          southwest: {
            lat: 39.9168132197085,
            lng: -105.7857067302915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Deno's Mountain Bistro",
      opening_hours: {
        open_now: false,
      },
      photos: [
        {
          height: 4000,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/112929006721363947192"\u003eDeno&#39;s Mountain Bistro\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0nOQs3LjUo52u8V9T-1XT_7NWdsbUIMYHeR9Movg9V2rpa1u-CUHABpYPGyg601bWcM-dVm_0MP1K8BGX_avb89A0VzJ-vt7OWd3IF-hVL3PR8rleeVsQnHvmHs1BmNvOOrH31ymiYOikW19tWl6hCDHaRIUUcnN7hxa5QlA2nr48W7",
          width: 6000,
        },
      ],
      place_id: "ChIJWafwEtM0aocRk7xiQsnAAng",
      plus_code: {
        compound_code: "W698+77 Winter Park, CO, USA",
        global_code: "85FPW698+77",
      },
      price_level: 3,
      rating: 4.4,
      reference: "ChIJWafwEtM0aocRk7xiQsnAAng",
      scope: "GOOGLE",
      types: [
        "restaurant",
        "bar",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 1173,
      vicinity: "78911 U.S. 40, Winter Park",
    },
    {
      business_status: "CLOSED_TEMPORARILY",
      geometry: {
        location: {
          lat: 39.9421218,
          lng: -105.8111043,
        },
        viewport: {
          northeast: {
            lat: 39.9435187302915,
            lng: -105.8097799697085,
          },
          southwest: {
            lat: 39.9408207697085,
            lng: -105.8124779302915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Elevation Pizza",
      permanently_closed: true,
      photos: [
        {
          height: 3072,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/109013600831998784341"\u003eDel DeVries\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0lHNAjN5dOucOweYt9gW8cyk1OpENVy4x6khSAADeYKPkvPj8VZ91Jx7wvvBCe14AljWZ-KMoUiMBRL7qMBGDzVgB1uAzdbqWbBS7VydjJjLfeYsQCwB2g4IOH1CkaGl1zgzafGg6xCkOQ8OdRbAV90UrFc1VFCMbYiNfT3nJFs1Elj",
          width: 4080,
        },
      ],
      place_id: "ChIJ_4m545s0aocR42HeSzPsSzs",
      plus_code: {
        compound_code: "W5RQ+RH Fraser, CO, USA",
        global_code: "85FPW5RQ+RH",
      },
      price_level: 2,
      rating: 4.5,
      reference: "ChIJ_4m545s0aocR42HeSzPsSzs",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 563,
      vicinity: "551 Zerex Street, Fraser",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9257543,
          lng: -105.7885644,
        },
        viewport: {
          northeast: {
            lat: 39.92722808029151,
            lng: -105.7868362197085,
          },
          southwest: {
            lat: 39.92453011970851,
            lng: -105.7895341802915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Fontenot\u2019s Seafood & Grill",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 480,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/100444751845300651374"\u003eFontenot\u2019s Seafood &amp; Grill\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0k_YXDhEv2qJo2Krw5ZAQk6MPRvrOAp0kTb39jKZJHmQA5lXW0ZWdZhVYJLEXjMIeD6GndGs_uccYp7g7qbtuzncV7C6mXENrsfp-GIBEhdZk65wN_YceR4Gals6T1GqFZHG1piSxx4n1Kv8Psestaq_luGtard6qc9QppR7kxSVwph",
          width: 640,
        },
      ],
      place_id: "ChIJq1j1HMw0aocR0ZN5-XavVpE",
      plus_code: {
        compound_code: "W6G6+8H Winter Park, CO, USA",
        global_code: "85FPW6G6+8H",
      },
      price_level: 2,
      rating: 4.4,
      reference: "ChIJq1j1HMw0aocR0ZN5-XavVpE",
      scope: "GOOGLE",
      types: [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 535,
      vicinity: "78336 U.S. 40, Winter Park",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.91900219999999,
          lng: -105.7851796,
        },
        viewport: {
          northeast: {
            lat: 39.92047343029149,
            lng: -105.7838403197085,
          },
          southwest: {
            lat: 39.91777546970849,
            lng: -105.7865382802915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "McDonald's",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/117686600482189891551"\u003eJose Vieitez\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0n_5dOSOHzwBKSoGTnjzo7CUlXpzq8xZWb1cPlhUf0hdEAxExF51ohBJiaSxissfExaJJ0erU-3o6uyjDrnPTSzq24zRdkrO0pCL21KND6txm5tZ56Yu7SInDr5lEOpRm_-pCal3Qs-EIVldynbh_9a99A-zwHztVOoS1CrUjrgj_nY",
          width: 4032,
        },
      ],
      place_id: "ChIJjSHdUtI0aocR_jKGWyQTQf0",
      plus_code: {
        compound_code: "W697+JW Winter Park, CO, USA",
        global_code: "85FPW697+JW",
      },
      price_level: 1,
      rating: 3.1,
      reference: "ChIJjSHdUtI0aocR_jKGWyQTQf0",
      scope: "GOOGLE",
      types: [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 784,
      vicinity: "78850 U.S. 40, Winter Park",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 39.9444238,
          lng: -105.8131329,
        },
        viewport: {
          northeast: {
            lat: 39.9457417802915,
            lng: -105.8115750697085,
          },
          southwest: {
            lat: 39.9430438197085,
            lng: -105.8142730302915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Fuego Azteca Mexican Restaurant & Cantina",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/104372336283933877175"\u003eAndrew Schneider\u003c/a\u003e',
          ],
          photo_reference:
            "AZose0mDrMwwKX0T4YB6oIyfFlTklC9soKyBvQCGT_gJ7HA-33fNA4Guwjo_peTzGl0olytaVrIQRGcMmHQC4zEmx8LdHEsx36924ejfKtE7dzPHbszT4yhmlfn98FDlmSjqfkZRfHwaAu5zq2kge32gAZ2zUwFEp7tBGaunwAPbD8OevwB7",
          width: 4032,
        },
      ],
      place_id: "ChIJGfNLQJw0aocRqlKNY3o2yYA",
      plus_code: {
        compound_code: "W5VP+QP Fraser, CO, USA",
        global_code: "85FPW5VP+QP",
      },
      price_level: 2,
      rating: 4.2,
      reference: "ChIJGfNLQJw0aocRqlKNY3o2yYA",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 862,
      vicinity: "5 County Road 72, Fraser",
    },
  ],
  status: "OK",
};

export default SearchResultsScreen;
