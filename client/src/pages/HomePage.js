import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopSearches from '../components/TopSearches';
import History from '../components/History';
import SearchBar from '../components/SearchBar';
import ImageGrid from '../components/ImageGrid';

const HomePage = ({ user }) => {
  // State for all our data
  const [history, setHistory] = useState([]);
  const [searchData, setSearchData] = useState({ images: null, term: '', count: 0 });
  
  // Loading states
  const [historyLoading, setHistoryLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  // Fetch initial history data
  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5001/api/history');
      setHistory(data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
    setHistoryLoading(false);
  };

  // Fetch history on component load
  useEffect(() => {
    fetchHistory();
  }, []);

  // Function to be passed to SearchBar
  const handleSearch = async (term) => {
    setSearchLoading(true);
    try {
      // 1. Call the search API
      const { data } = await axios.post('http://localhost:5001/api/search', { term });
      setSearchData(data); // Set the image results
      
      // 2. Refresh the history
      fetchHistory(); 

    } catch (err) {
      console.error('Error during search:', err);
      alert('Search failed. Please try again.');
    }
    setSearchLoading(false);
  };

  return (
    <div className="home-page-container">
      <TopSearches />
      
      <div className="home-content-layout">
        <div className="main-content">
          <SearchBar onSearch={handleSearch} isLoading={searchLoading} />
          <ImageGrid searchData={searchData} />
        </div>
        <div className="sidebar-content">
          <History history={history} loading={historyLoading} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;