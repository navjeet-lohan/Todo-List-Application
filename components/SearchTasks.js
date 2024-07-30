import { useState } from 'react';
import styles from '../styles/Home.module.css';

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
      className={styles.searchBar}
    />
  );
};

export default SearchTasks;
