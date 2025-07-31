import React from 'react';
import './TripCoverSelector.css';

const TripCoverSelector = ({ covers, selectedCover, onSelect }) => {
  return (
    <div className="trip-cover-selector">
      <h3 className="selector-title">Kapak Fotoğrafı Seç</h3>
      <div className="covers-grid">
        {covers.map((cover) => (
          <div
            key={cover.id}
            className={`cover-item ${selectedCover === cover.id ? 'selected' : ''}`}
            onClick={() => onSelect(cover.id)}
          >
            <img src={cover.imageUrl} alt={cover.title} className="cover-image" />
            <div className="cover-overlay">
              <span className="cover-title">{cover.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripCoverSelector;
