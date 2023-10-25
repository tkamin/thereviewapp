import { useEffect, useState } from "react";
import { normalizeGooglePlacesSearchResults } from "../utils/normalizers";

const useGoogleNearbySearch = (searchText, location) => {
  const [googleData, setGoogleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //var uri =
  //  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=10000&type=restaurant&key=AIzaSyD0hLVwxYWa2zWSJHtFnlh7CEqygEYnfvc";
  var uri =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=distance&type=restaurant&key=AIzaSyD0hLVwxYWa2zWSJHtFnlh7CEqygEYnfvc";
  if (searchText && searchText !== null && searchText !== "") {
    uri += "&keyword=" + searchText;
  }

  useEffect(() => {
    if (
      location !== null &&
      location.coords !== null &&
      location.coords.latitude !== null &&
      location.coords.longitude !== null
    ) {
      uri +=
        "&location=" +
        location.coords.latitude +
        "%2C" +
        location.coords.longitude;
      console.log(uri);
      fetch(uri)
        .then((response) => response.json())
        .then((data) => {
          setError(data.error);
          setGoogleData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [uri, location]);

  return { googleData, loading, error };
};

const useGoogleDetails = (searchResults) => {
  const [googleDetails, setGoogleDetails] = useState([]);

  useEffect(() => {
    var ids = searchResults.map((item) => item.id);

    var uris = [];
    var uri =
      "https://maps.googleapis.com/maps/api/place/details/json?fields=formatted_phone_number,place_id&key=AIzaSyD0hLVwxYWa2zWSJHtFnlh7CEqygEYnfvc";

    if (Array.isArray(ids) && ids.length > 0) {
      ids.forEach(function (id, index) {
        if (id === undefined || id === null || id === "") {
          return;
        }
        uris.push(uri + "&place_id=" + id);
      });
    }

    if (uris.length !== 0) {
      console.log("CALLING useGoogleDetails google api: " + uris.length);

      var apiPromises = uris.map((uri) => {
        return fetch(uri, {
          method: "GET",
          headers: {
            Origin: "https://thereviewapp.com",
            Referer: "https://thereviewapp.com",
          },
        }).then((response) => response.json());
      });

      Promise.all(apiPromises).then((results) => {
        setGoogleDetails(results);
      });
    }
  }, [searchResults.length]);

  return googleDetails;
};

const fetchGoogleDetails = (ids) => {
  var uris = [];
  var uri =
    "https://maps.googleapis.com/maps/api/place/details/json?fields=formatted_phone_number,place_id&key=AIzaSyD0hLVwxYWa2zWSJHtFnlh7CEqygEYnfvc";

  if (Array.isArray(ids) && ids.length > 0) {
    ids.forEach(function (id, index) {
      if (id === undefined || id === null || id === "") {
        return;
      }
      uris.push(uri + "&place_id=" + id);
    });
  }

  if (uris.length === 0) {
    return [];
  }

  console.log("CALLING google api: " + uris.length);
  var apiPromises = uris.map((uri) => {
    return fetch(uri, {
      method: "GET",
      headers: {
        Origin: "https://thereviewapp.com",
        Referer: "https://thereviewapp.com",
      },
    }).then((response) => response.json());
  });

  Promise.all(apiPromises).then((results) => {
    return results;
  });

  return [];
};

const useGoogleFindPlace = (searchResults, location) => {
  const [googleFindPlaceResults, setGoogleFindPlaceResults] = useState([]);

  useEffect(() => {
    if (
      location === null ||
      location.coords === null ||
      location.coords.latitude === null ||
      location.coords.longitude === null
    ) {
      return;
    }

    const fetchWithPhoneNumber = async () => {
      var phone_numbers = searchResults.map(
        (item) => item.formatted_phone_number
      );

      var uris = [];
      var uri =
        "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyD0hLVwxYWa2zWSJHtFnlh7CEqygEYnfvc";
      uri +=
        "&fields=place_id,name,formatted_address,rating,user_ratings_total,photos,geometry";
      uri += "&inputtype=phonenumber&input=%2B1";

      if (Array.isArray(phone_numbers) && phone_numbers.length > 0) {
        phone_numbers.forEach(function (phone) {
          if (phone === undefined || phone === null || phone === "") {
            return;
          }
          uris.push(uri + phone);
        });
      }

      if (uris.length !== 0) {
        console.log("CALLING useGoogleFindPlace google api: " + uris.length);

        var apiPromises = uris.map((uri) => {
          return fetch(uri, {
            method: "GET",
            headers: {
              Origin: "https://thereviewapp.com",
              Referer: "https://thereviewapp.com",
            },
          }).then(async (response) => {
            var url = response.url;
            // TODO: internationalize this vvv
            var phone = url.slice(-10); // phone is last 10 digits of US number
            var json = await response.json();
            if (
              json !== undefined &&
              json !== null &&
              json.candidates &&
              json.candidates.length === 1
            ) {
              return normalizeGooglePlacesSearchResults(
                json.candidates,
                location,
                phone
              )[0];
            }
            return null;
          });
        });

        var results = await Promise.all(apiPromises).then((result) => {
          if (!!result) return result;
        });

        results = results.filter((result) => !!result);

        setGoogleFindPlaceResults(results);
      }
    };

    fetchWithPhoneNumber()
      // make sure to catch any error
      .catch(console.error);
  }, [searchResults.length, location]);

  return googleFindPlaceResults;
};

export {
  useGoogleNearbySearch,
  useGoogleDetails,
  fetchGoogleDetails,
  useGoogleFindPlace,
};
