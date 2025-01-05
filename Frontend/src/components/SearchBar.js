import React from "react";

export default function SearchBar({ setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search courses..."
      className="form-control my-3"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
