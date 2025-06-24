"use client";

import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

interface ProductSearchBarProps {
  searchQuery?: string;
  isFetching?: boolean;
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
}

export function ProductSearchBar({ 
  searchQuery, 
  isFetching = false, 
  onSearch,
  placeholder = "Search products...",
  className = "max-w-sm"
}: ProductSearchBarProps) {
  const handleSearch = useDebouncedCallback((term: string) => {
    onSearch(term);
  }, 300);

  return (
    <div className={`relative ${className}`}>
      <Input
        placeholder={placeholder}
        defaultValue={searchQuery || ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full"
      />
      {isFetching && (
        <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400" />
      )}
    </div>
  );
}