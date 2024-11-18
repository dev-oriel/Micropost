import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Access the query string from the URL

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      // Call your API or perform search with the query
      const fetchResults = async () => {
        try {
          const response = await fetch(`/api/search?query=${query}`);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }
  }, [location.search]);

  return (
    <div className="search-results">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id}>{result.name}</li>
              ))}
            </ul>
          ) : (
            <p>No results found</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
