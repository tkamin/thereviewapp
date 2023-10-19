import { useEffect, useState } from "react";
import { normalizeTripAdvisorDetails } from "../utils/normalizers";

const useTripAdvisorSearch = (searchText, location) => {
  const [tripAdvisorData, setTripAdvisorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  var uri =
    "https://api.content.tripadvisor.com/api/v1/location/nearby_search?key=38805DF776FF48AF84D0CFEB24D622DD&category=restaurants&radius=6&radiusUnit=mi&language=en";

  useEffect(() => {
    if (
      location !== null &&
      location.coords !== null &&
      location.coords.latitude !== null &&
      location.coords.longitude !== null
    ) {
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
    }
  }, [location]);

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

export { useTripAdvisorSearch };
