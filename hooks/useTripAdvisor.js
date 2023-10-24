import { useEffect, useState } from "react";
import { normalizeTripAdvisorDetails } from "../utils/normalizers";

const useTripAdvisorSearch = (searchText, location) => {
  const [tripAdvisorData, setTripAdvisorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  var uri =
    "https://api.content.tripadvisor.com/api/v1/location/nearby_search?key=38805DF776FF48AF84D0CFEB24D622DD&category=restaurants&radius=6&radiusUnit=mi&language=en";
  if (searchText !== undefined && searchText !== "") {
    uri =
      "https://api.content.tripadvisor.com/api/v1/location/search?key=38805DF776FF48AF84D0CFEB24D622DD&category=restaurants&radius=6&radiusUnit=mi&language=en&searchQuery=" +
      searchText;
  }

  useEffect(() => {
    if (
      location === null ||
      location.coords === null ||
      location.coords.latitude === null ||
      location.coords.longitude === null
    ) {
      return;
    }

    uri +=
      "&latLong=" +
      location.coords.latitude +
      "%2C" +
      location.coords.longitude;
    console.log(uri);
    fetch(uri, {
      method: "GET",
      headers: {
        Origin: "https://thereviewapp.com",
        Referer: "https://thereviewapp.com",
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.error) {
          console.error(data.error);
          setError(data.error);
          return;
        }

        if (
          data === null ||
          data.data === null ||
          !Array.isArray(data.data) ||
          data.data.length === 0
        ) {
          return;
        }

        // parse ids out of data
        var ids = data.data.map((item) => item.location_id);
        // run all details
        var tripAdvisorDetails = await fetchTripAdvisorDetails(ids);
        // filter categories
        tripAdvisorDetails = tripAdvisorDetails.filter((item) => {
          if (
            item === undefined ||
            item.category === undefined ||
            item.category.name === undefined
          ) {
            return false;
          }

          // need phone number. TODO: think through this some
          if (item.phone === undefined) {
            return false;
          }

          //TODO: pass in category type
          return item.category.name === "restaurant";
        });

        // setTripAdvisorData
        var normalizedDetails = normalizeTripAdvisorDetails(
          tripAdvisorDetails,
          location
        );
        setTripAdvisorData(normalizedDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchText, location]);

  return { tripAdvisorData, loading, error };
};

const fetchTripAdvisorDetails = async (ids) => {
  var uris = [];
  var uri = "https://api.content.tripadvisor.com/api/v1/location/";

  if (Array.isArray(ids) && ids.length > 0) {
    ids.forEach(function (id, index) {
      if (id === undefined || id === null || id === "") {
        return;
      }
      uris.push(uri + id + "/details?key=38805DF776FF48AF84D0CFEB24D622DD");
    });
  }

  if (uris.length === 0) {
    return [];
  }

  console.log("CALLING fetchTripAdvisorDetails for: " + uris.length);

  var apiPromises = uris.map((uri) => {
    return fetch(uri, {
      method: "GET",
      headers: {
        Origin: "https://thereviewapp.com",
        Referer: "https://thereviewapp.com",
      },
    }).then((response) => response.json());
  });

  var results = await Promise.all(apiPromises).then((results) => {
    return results;
  });

  return results;
};

const useTripAdvisorPhoneSearch = (places, location) => {
  const [tripAdvisorPhoneResults, setTripAdvisorPhoneResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  var baseUri =
    "https://api.content.tripadvisor.com/api/v1/location/search?key=38805DF776FF48AF84D0CFEB24D622DD&category=restaurants&radius=6&radiusUnit=mi&language=en&searchQuery=";

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
      var uris = [];
      if (Array.isArray(places) && places.length > 0) {
        places.forEach(function (place, index) {
          if (
            place === undefined ||
            place === null ||
            place === "" ||
            place.name === undefined ||
            place.formatted_phone_number === undefined ||
            place.name === "" ||
            place.formatted_phone_number === ""
          ) {
            return;
          }

          console.log(
            "PUSHING: " +
              baseUri +
              encodeURIComponent(place.name.split(" ")[0]) +
              "&phone=" +
              place.formatted_phone_number
          );
          uris.push(
            baseUri +
              encodeURIComponent(place.name.split(" ")[0]) +
              "&phone=" +
              place.formatted_phone_number
          );
        });
      }

      console.log("CALLING fetchWithPhoneNumber for: " + uris.length);

      if (uris.length === 0) {
        return;
      }

      var apiPromises = uris.map((uri) => {
        return fetch(uri, {
          method: "GET",
          headers: {
            Origin: "https://thereviewapp.com",
            Referer: "https://thereviewapp.com",
          },
        })
          .then((response) => response.json())
          .then(async (data) => {
            if (data.error) {
              console.error(data.error);
              setError(data.error);
              return;
            }

            if (
              data === null ||
              data.data === null ||
              !Array.isArray(data.data) ||
              data.data.length === 0
            ) {
              return;
            }

            // parse ids out of data
            var ids = data.data.map((item) => item.location_id);
            // run all details
            var tripAdvisorDetails = await fetchTripAdvisorDetails(ids);
            // filter categories
            tripAdvisorDetails = tripAdvisorDetails.filter((item) => {
              if (
                item === undefined ||
                item.category === undefined ||
                item.category.name === undefined
              ) {
                return false;
              }

              // need phone number. TODO: think through this some
              if (item.phone === undefined) {
                return false;
              }

              //TODO: pass in category type
              return item.category.name === "restaurant";
            });

            // setTripAdvisorData
            var normalizedDetails = normalizeTripAdvisorDetails(
              tripAdvisorDetails,
              location
            );
            return normalizedDetails;
          })
          .catch((error) => {
            console.error(error);
          });
      });

      var results = await Promise.all(apiPromises).then((result) => {
        console.log("HERE: ");
        console.log(JSON.stringify(result));
        if (
          !result ||
          result === null ||
          !Array.isArray(result) ||
          result.length === 0
        ) {
          return [];
        }

        return result
          .filter((r) => !!r)
          .map((r) => {
            if (Array.isArray(r)) {
              return r[0];
            }
          });
      });

      results = results.filter((result) => !!result);

      console.log("RESULTS: " + results.length);
      console.log(JSON.stringify(results));

      setTripAdvisorPhoneResults(results);
    };

    fetchWithPhoneNumber()
      // make sure to catch any error
      .catch(console.error);
  }, [places.length, location]);

  return tripAdvisorPhoneResults;
};

export { useTripAdvisorSearch, useTripAdvisorPhoneSearch };
