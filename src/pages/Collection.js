import React, { useEffect } from "react";
import CollectionItem from "../components/CollectionItem";
import { useCollectionContext } from "../hooks/useCollectionsContext";
const Collection = () => {
  const { collections, dispatch } = useCollectionContext();
  useEffect(() => {
    const getItems = async () => {
      const response = await fetch("https://ecommerce-server-ten-phi.vercel.app/api/products/all");
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_COLLECTIONS", payload: data });
      }
    };
    getItems();
  }, [dispatch]);
  return (
    <div className="collection-area">
      <div className="filter-panel">filter</div>
      <div className="collection-grid">
        {collections?.map((item) => {
          return (
            <CollectionItem
              key={item._id}
              image={item.image}
              title={item.name}
              price={item.price}
              itemid = {item._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Collection;
