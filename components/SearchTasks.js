import { useState } from 'react';

const SearchTasks = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search Tasks"
      value={query}
      onChange={handleSearch}
    />
  );
};

export default SearchTasks;
