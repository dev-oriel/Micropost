import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-white rounded-full shadow-md p-1 max-w-sm w-full"
    >
      <input
        type="text"
        className="flex-grow bg-transparent outline-none px-4 py-2 text-gray-800 placeholder-gray-400"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-theme hover:bg-theme-dark text-white font-semibold px-4 py-2 rounded-full transition-all"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
