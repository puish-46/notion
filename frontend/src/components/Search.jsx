import React, { useState } from "react";

function Search() {

  const [search, setSearch] = useState("");

  return (
    <div className="w-full flex justify-center mt-6">

      {/* Search Box */}
      <div className="w-[90%] max-w-2xl bg-white border border-gray-300 rounded-xl px-4 py-3 flex items-center shadow-sm">

        {/* Search Icon */}
        <span className="text-gray-500 text-lg mr-3">
          🔍
        </span>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search pages, boards, tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
        />

      </div>

    </div>
  );
}

export default Search;