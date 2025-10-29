import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopSearches = () => {
  const [topSearches, setTopSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSearches = async () => {
      try {
        // Axios will send cookies by default now
        const { data } = await axios.get('http://localhost:5001/api/top-searches');
        setTopSearches(data);
      } catch (err) {
        console.error('Error fetching top searches:', err);
      }
      setLoading(false);
    };

    fetchTopSearches();
  }, []);

  if (loading) {
    return <div>Loading top searches...</div>;
  }

  return (
    <div className="top-searches-banner">
      <strong>Top Searches:</strong>
      <ul>
        {topSearches.length > 0 ? (
          topSearches.map((search) => (
            <li key={search.term}>{search.term} ({search.count})</li>
          ))
        ) : (
          <li>No searches yet</li>
        )}
      </ul>
    </div>
  );
};

export default TopSearches;