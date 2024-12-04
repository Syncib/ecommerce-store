import React from "react";
import CollectionItem from "../components/CollectionItem";
const Collection = () => {
 
  return (
    <div className="collection-area">
      <div className="filter-panel">filter</div>
      <div className="collection-grid">
        {/* {items.map((item) => {
          return (
            <CollectionItem
              key={item.id}
              image={item.image}
              title={item.name}
              price={item.price}
            />
          );
        })} */}
      </div>
    </div>
  );
};

export default Collection;
