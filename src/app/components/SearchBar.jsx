"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
    // Your search logic
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 via-blue-50 to-white border border-gray-200 shadow-lg rounded-full px-6 py-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-200">
        <Search className="text-blue-500 w-6 h-6" />
        <Input
          type="text"
          placeholder="Search subjects,notes...."
          className="flex-1 text-lg  outline-none border-none shadow-none focus-visible:ring-0 focus-visible:outline-none bg-transparent placeholder:text-gray-600"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button
          onClick={handleSearch}
          className="rounded-full px-6 py-2 text-lg bg-gradient-to-r from-blue-200 via-blue-100 to-white text-gray-800 hover:from-blue-300 hover:via-blue-100 hover:to-white transition-all duration-300 shadow-md border border-gray-300"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
