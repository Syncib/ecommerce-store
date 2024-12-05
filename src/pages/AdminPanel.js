import React, { useEffect, useState } from "react";
import AddItems from "./AddItems";
import CollectionItem from "../components/CollectionItem";
import skeimg from "../assets/images/skeleton/image-1@2x.jpg"
const AdminPanel = () => {
  const [action, setAction] = useState("additems");
  const [item, setItem] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
    stock: 0,
  });
  const [preview, setPreview] = useState(skeimg);

  useEffect(() => {
    if (item.image instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(item.image);
      reader.onload = () => setPreview(reader.result);
    } else {
      setPreview(skeimg); // Clear preview if `item.image` is not valid
    }
  }, [item.image]);
  return (
    <div className="admin-panel">
      <div className="admin-actions">
        <h1>Actions</h1>
        <div className="admin-buttons">
          <button onClick={() => setAction("additems")}>Add New Item</button>
          <button>Add New Coupon</button>
          <button>View Orders</button>
          <button>View Coupons</button>
          <button>Modify Stock</button>
        </div>
      </div>
      <div className="admin-display">
        {action === "additems" && (
          <div className="additempnl">
            <div>
              <h1>Add New Item</h1>
              <AddItems item={item} setItem={setItem} />
            </div>
            <div>
              <h1>Preview Item</h1>
              <CollectionItem
                title={item.name}
                price={item.price}
                image={preview}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
