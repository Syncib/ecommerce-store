import React, { useEffect, useState } from "react";
import CollectionItem from "../components/CollectionItem";
import { useCollectionContext } from "../hooks/useCollectionsContext";

const Collection = () => {
  const { collections, dispatch } = useCollectionContext();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        "https://ecommerce-server-ten-phi.vercel.app/api/products/all"
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_COLLECTIONS", payload: data });

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      }
    };
    getItems();
  }, [dispatch]);

  // Filter collections based on the selected category
  const filteredCollections =
    selectedCategory === "All"
      ? collections
      : collections?.filter((item) => item.category === selectedCategory);

  return (
    <div className="collection-area">
      <div className="filter-panel">
        <label htmlFor="category-filter">Filter by Category: </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="collection-grid">
        {filteredCollections?.map((item) => (
          <CollectionItem
            key={item._id}
            image={item.image}
            title={item.name}
            price={item.price}
            description={item.description}
            itemid={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
