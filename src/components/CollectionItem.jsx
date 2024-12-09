import { useNavigate } from "react-router-dom";
import { useCollectionContext } from "../hooks/useCollectionsContext";
import "./CollectionItem.css"
const CollectionItem = ({ image, title, price, itemid }) => {
  const { dispatch } = useCollectionContext();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const item = { image, title, price, itemid };
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  return (
    <div className="collection-card">
      <img src={image} alt="item" />
      <p className="title">{title}</p>
      <p className="price">${price}</p>
      <div className="actions">
        <button onClick={() => navigate(`/buy/${itemid}`)}>View Details</button>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default CollectionItem;
