import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Simulate a search result fetch
    if (value.trim() !== "") {
      setResults([
        { id: 1, name: "Result 1" },
        { id: 2, name: "Result 2" },
        { id: 3, name: "Result 3" },
      ]);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Search</h1>
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Type to search..."
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Results */}
        <div>
          {results.length > 0 ? (
            <ul className="space-y-4">
              {results.map((result) => (
                <li
                  key={result.id}
                  className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
                >
                  {result.name}
                </li>
              ))}
            </ul>
          ) : (
            query && (
              <p className="text-gray-500">No results found for "{query}".</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
