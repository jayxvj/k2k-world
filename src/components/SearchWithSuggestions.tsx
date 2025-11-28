import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Destination } from "@/lib/types";
import Link from "next/link";

interface SearchWithSuggestionsProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export const SearchWithSuggestions = ({ onSearch, className = "" }: SearchWithSuggestionsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Destination[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch all destinations for suggestions
    async function fetchDestinations() {
      try {
        const response = await fetch("/api/destinations");
        const data = await response.json();
        if (data.success) {
          setAllDestinations(data.data);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    }
    fetchDestinations();
  }, []);

  useEffect(() => {
    // Filter suggestions based on search query
    if (searchQuery.trim().length > 0) {
      const filtered = allDestinations.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, allDestinations]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
        <div className="flex items-center gap-2">
          <Search className="w-6 h-6 text-white ml-4" />
          <Input
            type="text"
            placeholder="Where do you want to go?"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="flex-1 bg-transparent border-0 text-white placeholder:text-gray-300 focus-visible:ring-0"
          />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-200"
          >
            {suggestions.map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.slug}`}
                onClick={() => {
                  setShowSuggestions(false);
                  setSearchQuery("");
                }}
              >
                <div className="px-6 py-4 hover:bg-purple-50 transition-colors border-b last:border-b-0 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{destination.name}</h4>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {destination.shortDescription}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">From</p>
                      <p className="font-bold text-purple-600">
                        ₹{destination.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
