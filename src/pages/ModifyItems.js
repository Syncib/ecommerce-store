import React, { useEffect } from "react";
import { useCollectionContext } from "../hooks/useCollectionsContext";
import { useUserContext } from "../hooks/useUserContext";

const ModifyItems = () => {
  const { collections, dispatch } = useCollectionContext();
  const { user } = useUserContext();
  const handleDelete = async (id) => {
    const response = await fetch(
      `https://ecommerce-server-ten-phi.vercel.app/api/admin/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      }
    );
    if (response.ok) {
      dispatch({
        type: "SET_COLLECTIONS",
        payload: collections.filter((item) => {
          return item.id !== id;
        }),
      });
    }
  };
  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        "https://ecommerce-server-ten-phi.vercel.app/api/products/all"
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_COLLECTIONS", payload: data });
      }
    };
    getItems();
  }, [dispatch]);
  return (
    <div className="modify-items">
      <h1>Modify Items</h1>
      <div className="item-list">
        {collections?.map((item) => (
          <div className="item" key={item._id}>
            <img src={item.image} alt={item.name} />
            <div className="item-name">{item.name}</div>
            <div className="item-price">{item.price}</div>
            <div className="item-buttons">
              <button className="item-edit">Edit</button>
              <button
                className="item-delete"
                onClick={() => {
                  handleDelete(item._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModifyItems;
