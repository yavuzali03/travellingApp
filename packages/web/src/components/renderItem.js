import React from 'react';
import './RenderItem.css';

const RenderItem = ({ item, onPress }) => {
  return (
    <div className="render-item" onClick={() => onPress(item)}>
      <img src={item.image} alt={item.title} className="item-image" />
      <div className="item-content">
        <h3 className="item-title">{item.title}</h3>
        <p className="item-description">{item.description}</p>
      </div>
    </div>
  );
};

export default RenderItem;
