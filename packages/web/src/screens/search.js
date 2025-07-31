import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import RenderItem from '../components/renderItem';

const Search = ({ searchValue, onSearch, setOnSearch }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const test_API_URL = process.env.test_API_URL;

  const debouncedSearch = debounce(async (text) => {
    if (!text) {
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${test_API_URL}/search?query=${text}`);
      setResults(response.data);
    } catch (error) {
      console.error('Arama hatası:', error);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  return (
    <div className="search-container">
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="search-results">
          {results.map((item) => (
            <RenderItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
