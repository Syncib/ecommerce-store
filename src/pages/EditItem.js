import React, { useEffect, useRef } from "react";
import { useUserContext } from "../hooks/useUserContext";

const EditItem = ({ item, setItem, resetItem, editId , setAction }) => {
  const fileInputRef = useRef(null);
  const { user } = useUserContext();

  useEffect(() => {
    const getItem = async (itemId) => {
      try {
        const response = await fetch(
          `https://ecommerce-server-ten-phi.vercel.app/api/products/single/${itemId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const json = await response.json(); // Await the response parsing
          setItem((prevItem) => ({ ...prevItem, ...json }));
        } else {
          console.error("Failed to fetch item details");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    if (editId) {
      getItem(editId);
    }
  }, [editId, user.token, setItem]);

  const editItem = async (e, itemId) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("name", item.name);
      data.set("price", item.price);
      data.set("description", item.description);
      data.set("image", item.image);
      data.set("category", item.category);
      data.set("stock", item.stock);

      const response = await fetch(
        `https://ecommerce-server-ten-phi.vercel.app/api/admin/edit/${itemId}`,
        {
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        resetItem();
        setAction("modifystock")
        if (fileInputRef.current) {
          fileInputRef.current.value = null; // Reset file input
        }
      } else {
        console.error("Failed to edit item");
      }
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  return (
    <form
      className="addform"
      onSubmit={(e) => {
        editItem(e, editId);
      }}
    >
      <label htmlFor="itemName">Item Name</label>
      <input
        id="itemName"
        type="text"
        placeholder="Enter item name"
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        value={item.name || ""}
      />

      <label htmlFor="itemPrice">Item Price</label>
      <input
        id="itemPrice"
        type="number"
        placeholder="Enter item price"
        onChange={(e) =>
          setItem({ ...item, price: parseFloat(e.target.value) || 0 })
        }
        value={item.price || ""}
      />

      <label htmlFor="itemDescription">Item Description</label>
      <input
        id="itemDescription"
        type="text"
        placeholder="Enter item description"
        onChange={(e) => setItem({ ...item, description: e.target.value })}
        value={item.description || ""}
      />

      <label htmlFor="itemCategory">Item Category</label>
      <input
        id="itemCategory"
        type="text"
        placeholder="Enter item category"
        onChange={(e) => setItem({ ...item, category: e.target.value })}
        value={item.category || ""}
      />

      <label htmlFor="itemStock">Item Stock</label>
      <input
        id="itemStock"
        type="number"
        placeholder="Enter item stock"
        onChange={(e) =>
          setItem({ ...item, stock: parseInt(e.target.value, 10) || 0 })
        }
        value={item.stock || ""}
      />

      <label htmlFor="itemImage">Item Image</label>
      <input
        id="itemImage"
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setItem({ ...item, image: file });
          }
        }}
      />

      <button type="submit">Edit Item</button>
    </form>
  );
};

export default EditItem;
