import {
  mergeResultsOnAddress,
  normalizeGooglePlacesSearchResults,
  normalizeTripAdvisorSearchResults,
} from "../utils/normalizers";
import {
  useGoogleNearbySearch,
  useGoogleDetails,
} from "../hooks/useGooglePlaces";
import { useTripAdvisorNearbySearch } from "../hooks/useTripAdvisor";

const useSearch = (location, query) => {
  var searchResults = [];

  const { googleData, loading1, error1 } = useGoogleNearbySearch(
    query,
    location
  );
  searchResults = normalizeGooglePlacesSearchResults(googleData);
  var googleDetails = useGoogleDetails(searchResults.map((item) => item.id));

  const { tripAdvisorData, loading2, error2 } =
    useTripAdvisorNearbySearch(location);
  tripAdvisorSearchResults = normalizeTripAdvisorSearchResults(tripAdvisorData);
  searchResults = mergeResultsOnAddress(
    searchResults,
    tripAdvisorSearchResults
  );

  return searchResults;
};

export { useSearch };
