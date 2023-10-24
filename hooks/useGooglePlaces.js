import { useEffect, useState } from "react";

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

    console.log("CALLING useGoogleDetails: " + ids.length);

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

export { useGoogleNearbySearch, useGoogleDetails, fetchGoogleDetails };
