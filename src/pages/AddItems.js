import React, { useRef } from "react";

const AddItems = ({ item, setItem, resetItem }) => {
  const fileInputRef = useRef(null);

  const addNewItem = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("name", item.name);
    data.set("price", item.price);
    data.set("description", item.description);
    data.set("image", item.image);
    data.set("category", item.category);
    data.set("stock", item.stock);

    const response = await fetch("http://localhost:4000/api/admin/add", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      resetItem(); // Reset item state and preview in AdminPanel
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Clear file input
      }
    }
  };

  return (
    <form className="addform" onSubmit={addNewItem}>
      <label>Item Name</label>
      <input
        type="text"
        placeholder="Enter item name"
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        value={item.name}
      />
      <label>Item Price</label>
      <input
        type="number"
        placeholder="Enter item price"
        onChange={(e) =>
          setItem({ ...item, price: parseFloat(e.target.value) || 0 })
        }
        value={item.price}
      />
      <label>Item Description</label>
      <input
        type="text"
        placeholder="Enter item description"
        onChange={(e) => setItem({ ...item, description: e.target.value })}
        value={item.description}
      />
      <label>Item Category</label>
      <input
        type="text"
        placeholder="Enter item category"
        onChange={(e) => setItem({ ...item, category: e.target.value })}
        value={item.category}
      />
      <label>Item Stock</label>
      <input
        type="number"
        placeholder="Enter item stock"
        onChange={(e) => setItem({ ...item, stock: parseInt(e.target.value) || 0 })}
        value={item.stock}
      />
      <label>Item Image</label>
      <input
        type="file"
        ref={fileInputRef} // Assign the ref
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setItem({ ...item, image: file });
          }
        }}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItems;
