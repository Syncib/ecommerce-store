import React from "react";
import "./CollectionItem.css";
const CollectionItem = ({ image, title, price }) => {
  return (
    <div className="collection-card">
      <img src={image} alt="image" />
      <p className="title">{title}</p>
      <div className="actions">
        <p className="price">${price}</p>
        <button className="cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default CollectionItem;
