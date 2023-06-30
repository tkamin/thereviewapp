import { useEffect, useState } from "react";

const useTripAdvisorSearch = (searchText, location) => {
  const { tripAdvisorSearchResults, loading, error } =
    useTripAdvisorNearbySearch(location);
  return { tripAdvisorSearchResults, loading, error };
};

const useTripAdvisorNearbySearch = (location) => {
  const [tripAdvisorData, setTripAdvisorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  var uri =
    "https://api.content.tripadvisor.com/api/v1/location/nearby_search?key=38805DF776FF48AF84D0CFEB24D622DD&category=restaurants&radius=10000&radiusUnit=m&language=en";

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
        .then((data) => {
          setError(data.error);
          setTripAdvisorData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [uri, location]);

  return { tripAdvisorData, loading, error };
};

export { useTripAdvisorSearch, useTripAdvisorNearbySearch };
