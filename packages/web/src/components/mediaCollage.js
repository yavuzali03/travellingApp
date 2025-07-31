import React from 'react';
import './MediaCollage.css';

const MediaCollage = ({ images, onImageClick }) => {
  const renderCollage = () => {
    if (images.length === 0) return null;
    if (images.length === 1) {
      return (
        <div className="single-image" onClick={() => onImageClick(images[0])}>
          <img src={images[0].url} alt={images[0].alt || 'Media'} />
        </div>
      );
    }
    if (images.length === 2) {
      return (
        <div className="two-images">
          <div className="image-container" onClick={() => onImageClick(images[0])}>
            <img src={images[0].url} alt={images[0].alt || 'Media 1'} />
          </div>
          <div className="image-container" onClick={() => onImageClick(images[1])}>
            <img src={images[1].url} alt={images[1].alt || 'Media 2'} />
          </div>
        </div>
      );
    }
    if (images.length === 3) {
      return (
        <div className="three-images">
          <div className="large-image" onClick={() => onImageClick(images[0])}>
            <img src={images[0].url} alt={images[0].alt || 'Media 1'} />
          </div>
          <div className="small-images">
            <div className="image-container" onClick={() => onImageClick(images[1])}>
              <img src={images[1].url} alt={images[1].alt || 'Media 2'} />
            </div>
            <div className="image-container" onClick={() => onImageClick(images[2])}>
              <img src={images[2].url} alt={images[2].alt || 'Media 3'} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="four-images">
        <div className="image-container" onClick={() => onImageClick(images[0])}>
          <img src={images[0].url} alt={images[0].alt || 'Media 1'} />
        </div>
        <div className="image-container" onClick={() => onImageClick(images[1])}>
          <img src={images[1].url} alt={images[1].alt || 'Media 2'} />
        </div>
        <div className="image-container" onClick={() => onImageClick(images[2])}>
          <img src={images[2].url} alt={images[2].alt || 'Media 3'} />
        </div>
        <div className="image-container overlay" onClick={() => onImageClick(images[3])}>
          <img src={images[3].url} alt={images[3].alt || 'Media 4'} />
          {images.length > 4 && (
            <div className="more-overlay">
              <span>+{images.length - 4}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="media-collage">
      {renderCollage()}
    </div>
  );
};

export default MediaCollage;
