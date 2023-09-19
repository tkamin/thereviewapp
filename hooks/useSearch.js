import {
  mergeResultsOnAddress,
  normalizeGooglePlacesSearchResults,
  normalizeTripAdvisorSearchResults,
} from "../utils/normalizers";
import {
  useGoogleNearbySearch,
  useGoogleDetails,
  fetchGoogleDetails,
} from "../hooks/useGooglePlaces";
import { useTripAdvisorNearbySearch } from "../hooks/useTripAdvisor";

const useSearch = (location, query) => {
  var searchResults = [];

  const { googleData, loading1, error1 } = useGoogleNearbySearch(
    query,
    location
  );
  console.log("useSearch called");
  searchResults = normalizeGooglePlacesSearchResults(googleData);
  var googleIds = searchResults.map((item) => item.id);
  var googleDetails = fetchGoogleDetails(googleIds);

  const { tripAdvisorData, loading2, error2 } =
    useTripAdvisorNearbySearch(location);
  tripAdvisorSearchResults = normalizeTripAdvisorSearchResults(tripAdvisorData);
  searchResults = mergeResultsOnAddress(
    searchResults,
    tripAdvisorSearchResults
  );

  return searchResults;
};

const search = (location, query) => {
  var searchResults = [];

  const { googleData, loading1, error1 } = useGoogleNearbySearch(
    query,
    location
  );
  console.log("search called");
  searchResults = normalizeGooglePlacesSearchResults(googleData);
  var googleDetails = fetchGoogleDetails(searchResults.map((item) => item.id));

  const { tripAdvisorData, loading2, error2 } =
    useTripAdvisorNearbySearch(location);
  tripAdvisorSearchResults = normalizeTripAdvisorSearchResults(tripAdvisorData);
  searchResults = mergeResultsOnAddress(
    searchResults,
    tripAdvisorSearchResults
  );

  return searchResults;
};

export { useSearch, search };
