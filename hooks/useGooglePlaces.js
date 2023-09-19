import { useEffect, useState } from "react";

const useGoogleNearbySearch = (searchText, location) => {
  const [googleData, setGoogleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  var uri =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=10000&type=restaurant&key=AIzaSyD0hLVwxYWa2zWSJHtFnlh7CEqygEYnfvc";
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
  console.log("CALLING fetchGoogleDetails");

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

/*
      uri +=
        "&latLong=" +
        location.coords.latitude +
        "%2C" +
        location.coords.longitude;
      fetch(uri, {
        method: "GET",
        headers: {
          Origin: "https://thereviewapp.com",
          Referer: "https://thereviewapp.com",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setError(data.error);
          setTripAdvisorData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
        */
/*
      Promise.all(apiPromises).then((data) => {
        setError(data.error);
        console.log(data);
        setTripAdvisorData(data);
        setLoading(false);
      });
    }, [uris, location]);
};

/*  var uris = [];
  var uri =
    "https://api.content.tripadvisor.com/api/v1/location/nearby_search?key=38805DF776FF48AF84D0CFEB24D622DD&category=restaurants&radius=10000&radiusUnit=m&language=en";

  if (Array.isArray(addresses) && addresses.length > 0) {
    addresses.forEach(function (address, index) {
      if (address === undefined || address === null || address === "") {
        return;
      }
      uris.push(uri + "&address=" + address);
      console.log("pushing: " + uri + "&address=" + address);
    });
  } else {
    uris.push(uri);
    console.log("pushing: " + uri);
  }

  return { tripAdvisorData, loading, error };

  useEffect(() => {
    if (
      location === null ||
      location.coords === null ||
      location.coords.latitude === null ||
      location.coords.longitude === null ||
      !uris ||
      !Array.isArray(uris)
    ) {
      return;
    }

    var apiPromises = uris.map((uri) => {
      uri +=
        "&latLong=" +
        location.coords.latitude +
        "%2C" +
        location.coords.longitude;

      console.log("URI:");
      console.log(uri);

      fetch(uri, {
        method: "GET",
        headers: {
          Origin: "https://thereviewapp.com",
          Referer: "https://thereviewapp.com",
        },
      })
        .then((response) => response.json())
        /*
          .then((data) => {
            setError(data.error);
            setTripAdvisorData(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
  
        /*          
              fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${obj.idDrink}`)
                  .then(res => res.json())
      });
      */

/*
      uri +=
        "&latLong=" +
        location.coords.latitude +
        "%2C" +
        location.coords.longitude;
      fetch(uri, {
        method: "GET",
        headers: {
          Origin: "https://thereviewapp.com",
          Referer: "https://thereviewapp.com",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setError(data.error);
          setTripAdvisorData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
        */
/*
      Promise.all(apiPromises).then((data) => {
        setError(data.error);
        console.log(data);
        setTripAdvisorData(data);
        setLoading(false);
      });
    }, [uris, location]);
    */

export { useGoogleNearbySearch, useGoogleDetails, fetchGoogleDetails };
