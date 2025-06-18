import React from "react";

export default function SearchBar({ setSearchTerm }) {
  return (
    <div className="search-container mb-4">
      <div className="position-relative">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          placeholder="Search for courses..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
