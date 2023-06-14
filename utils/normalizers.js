import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

/* 
Normalized:
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
*/

/* from 
[
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
    }
]
*/
export function normalizeGooglePlacesSearchResults(incoming) {
  var normalized = [];

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

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (incoming === null || !incoming.results) {
    return normalized;
  }

  if (location && location.coords) {
    incoming.results.map((place) => {
      var result = {};
      result.id = place.place_id;
      result.name = place.name;
      //result.icon = require("../assets/images/example-icon1.png");
      result.stars = require("../assets/images/5stars.png");
      result.rating = place.rating;
      result.rating_count = place.user_ratings_total;
      if (!result.rating_count) {
        result.rating_count = 0;
      }
      var source = {};
      source.name = "Google";
      source.icon = require("../assets/images/icons/small-google.png");
      source.rating = place.rating;
      source.rating_count = result.rating_count;
      result.sources = [];
      result.sources.push(source);

      result.icon =
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=";

      if (place.photos && place.photos[0] && place.photos[0].photo_reference) {
        result.icon +=
          place.photos[0].photo_reference +
          "&key=AIzaSyD0hLVwxYWa2zWSJHtFnlh7CEqygEYnfvc";
      } else {
        result.icon = place.icon;
      }

      result.distance = getDistanceFromLatLonInMiles(
        location.coords.latitude,
        location.coords.longitude,
        place.geometry.location.lat,
        place.geometry.location.lng
      );
      result.distance =
        (Math.round(result.distance * 100) / 100).toFixed(1) + " mi";
      result.review_source_count = 1;

      normalized.push(result);
    });
  }

  return normalized;
}

function getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2) {
  var km = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
  return km * 0.621371;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function normalizeGooglePlacesDetailsAddress(incoming) {
  var address = "";
  if (!incoming.result || !incoming.result.address_components) {
    return "";
  }
  var components = incoming.result.address_components;
  return (
    components[0].long_name +
    " " +
    components[1].long_name +
    "\n" +
    components[2].long_name +
    ", " +
    components[4].long_name +
    ", " +
    components[6].long_name +
    " "
  );
}
