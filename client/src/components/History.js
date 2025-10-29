import React from 'react';

// This is now a "dumb" component. It just renders the props it's given.
const History = ({ history, loading }) => {
  if (loading) {
    return <div className="history-sidebar"><h3>Your Search History</h3><p>Loading...</p></div>;
  }

  return (
    <div className="history-sidebar">
      <h3>Your Search History</h3>
      {history.length > 0 ? (
        <ul>
          {history.map((item) => (
            <li key={item._id}>
              {item.term}
              <span>{new Date(item.timestamp).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your search history is empty.</p>
      )}
    </div>
  );
};

export default History;