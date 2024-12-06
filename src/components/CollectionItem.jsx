import React from "react";
import { useNavigate } from "react-router-dom";
import "./CollectionItem.css";
const CollectionItem = ({ image, title, price, itemid }) => {
  const navigate = useNavigate();
  return (
    <div className="collection-card">
      <img src={image} alt="image" />
      <p className="title">{title}</p>
      <div className="actions">
        <p className="price">${price}</p>
        <button
          className="cart-button"
          onClick={() => navigate(`/buy/${itemid}`)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CollectionItem;
