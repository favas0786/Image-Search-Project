import React, { useState, useEffect } from 'react';

const ImageGrid = ({ searchData }) => {
  const { term, count, images } = searchData;
  const [selected, setSelected] = useState(new Set()); // Use a Set for efficient add/remove

  // Clear selection when a new search is performed
  useEffect(() => {
    setSelected(new Set());
  }, [images]);

  const handleSelect = (imageId) => {
    // Create a new set to trigger a state update
    setSelected(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(imageId)) {
        newSelected.delete(imageId); // Unselect
      } else {
        newSelected.add(imageId); // Select
      }
      return newSelected;
    });
  };

  if (!images) {
    return <div className="grid-placeholder">Search for images to see results.</div>;
  }

  return (
    <div className="image-grid-container">
      <div className="grid-header">
        <h3>You searched for "{term}" — {count} results.</h3>
        {/* The multi-select counter */}
        <div className="select-counter">
          <strong>Selected: {selected.size} images</strong>
        </div>
      </div>
      
      <div className="image-grid">
        {images.map((img) => {
          const isSelected = selected.has(img.id);
          return (
            <div
              key={img.id}
              className={`image-item ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(img.id)}
            >
              <img src={img.url} alt={img.description} />
              {/* The checkbox overlay */}
              <div className="checkbox-overlay">
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly // The div click handles the logic
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGrid;