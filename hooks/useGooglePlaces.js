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

export default useGoogleNearbySearch;
