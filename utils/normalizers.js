import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

/* 
Normalized:
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    tripAdvisorLocationId: '',
    address: "47 Cooper Creek Way #222, Winter Park",
    name: "Durbar - Nepalese & Indian Bistro",
    icon: require("../assets/images/example-icon1.png"),
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
      user_ratings_total: 1452,
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

  if (incoming === undefined || incoming === null || !incoming.results) {
    return normalized;
  }

  if (location && location.coords) {
    incoming.results.map((place) => {
      var result = {};
      result.id = place.place_id;
      result.name = place.name;
      result.address = place.vicinity;
      result.rating = place.rating;
      if (!result.rating) {
        result.rating = 0;
      }
      result.rating_count = place.user_ratings_total;
      if (!result.rating_count) {
        result.rating_count = 0;
      }

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

      var source = {};
      source.name = "Google";
      source.icon = require("../assets/images/icons/small-google.png");
      source.rating = place.rating;
      if (!source.rating) {
        source.rating = 0;
      }
      source.rating_count = result.rating_count;
      result.sources = [];
      result.sources.push(source);

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
  //console.log(incoming.result.address_components);
  if (!incoming.result || !incoming.result.address_components) {
    return "";
  }
  var components = incoming.result.address_components;
  var address =
    components[0].long_name +
    " " +
    components[1].long_name +
    "\n" +
    components[2].long_name +
    ", " +
    components[4].long_name;
  if (components[6] && components[6].long_name) {
    address += ", " + components[6].long_name;
  }
  return address;
}

/* 
Normalized:
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    tripAdvisorLocationId: '',
    address: '6827 County Road 51, Tabernash, CO 80478'
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
{
  "data": [
    {
      "location_id": "3915376",
      "name": "Bistro 28",
      "distance": "1.7383757135990503",
      "bearing": "west",
      "address_obj": {
        "street1": "6827 County Road 51",
        "city": "Tabernash",
        "state": "Colorado",
        "country": "United States",
        "postalcode": "80478",
        "address_string": "6827 County Road 51, Tabernash, CO 80478"
      }
    },
  ]
}
*/
export function normalizeTripAdvisorSearchResults(incoming, searchResults) {
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

  if (incoming === undefined || incoming === null || !incoming.data) {
    return normalized;
  }

  if (location && location.coords) {
    incoming.data.map((location) => {
      var result = {};
      result.id = location.location_id;
      result.tripAdvisorLocationId = location.location_id;
      result.name = location.name;
      result.rating = 0;
      result.rating_count = 0;
      result.distance =
        (Math.round(location.distance * 100) / 100).toFixed(1) + " mi";
      result.icon = require("../assets/images/example-icon1.png");
      result.review_source_count = 1;
      result.address = "";
      if (location.address_obj && location.address_obj.address_string) {
        result.address = location.address_obj.address_string;
      }

      var source = {};
      source.name = "Trip Advisor";
      source.icon = require("../assets/images/icons/small-trip-advisor.png");
      source.rating = 0;
      source.rating_count = 0;
      if (!result.sources) {
        result.sources = [];
      }
      result.sources.push(source);

      normalized.push(result);
    });
  }

  return normalized;
}

export function mergeResultsOnAddress(set1, set2) {
  var merged = [];
  if (
    (set1 === undefined || set1 === null) &&
    (set2 === undefined || set2 === null)
  ) {
    return merged;
  }

  if (set1 === undefined || set1 === null) {
    return set2;
  }

  if (set2 === undefined || set2 === null) {
    return set1;
  }

  var set2Copy = set2.map((x) => x);

  var hasNumber = /\d/;

  var notFound = [];
  set1.forEach(function (item, index) {
    if (item.address === undefined || item.address === null) {
      notFound.push(item);
      return;
    }
    const addressFirstPiece = item.address.substring(
      0,
      item.address.indexOf(",")
    );
    if (!hasNumber.test(addressFirstPiece)) {
      notFound.push(item);
      return;
    }

    let matchArray = set2Copy.filter(function (item2, index) {
      if (item2.address === undefined || item2.address === null) {
        return false;
      }

      const address2FirstPiece = item2.address.substring(
        0,
        item2.address.indexOf(",")
      );
      if (!hasNumber.test(address2FirstPiece)) {
        return false;
      }

      if (addressFirstPiece.normalize() === address2FirstPiece.normalize()) {
        return true;
      }
    });

    if (matchArray.length !== 1) {
      notFound.push(item);
      return;
    }

    merged.push(mergeResults(item, matchArray[0]));
    set2Copy = set2Copy.filter((item) => !matchArray.includes(item));
  });

  merged = merged.concat(notFound, set2Copy);
  return merged;
}

// set preference to result1, except where result2 contains better information
// copy sources as well
export function mergeResults(result1, result2) {
  if (result1 === undefined || result1 === null) {
    return result2;
  }
  if (result2 === undefined || result2 === null) {
    return result1;
  }

  let mergedResult = JSON.parse(JSON.stringify(result1));

  // distance transfer, address transfer, source transfer, icon transfer,
  if (
    (mergedResult.distance === undefined || mergedResult.distance === 0) &&
    result2.distance !== undefined
  ) {
    mergedResult.distance = result2.distance;
  }

  if (
    result2.address !== undefined &&
    (mergedResult.address === undefined ||
      result2.address.length > mergedResult.address.length)
  ) {
    mergedResult.address = result2.address;
  }

  if (mergedResult.sources === undefined) {
    mergedResult.sources = result2.sources;
  } else if (result2.sources !== undefined) {
    mergedResult.sources = mergedResult.sources.concat(result2.sources);
    mergedResult.review_source_count = mergedResult.sources.length;
  }

  if (result2.icon !== undefined && mergedResult.icon === undefined) {
    mergedResult.icon = result2.icon;
  }

  return mergedResult;
}
