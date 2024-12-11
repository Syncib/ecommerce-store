import React, { useEffect, useState } from "react";
import AddItems from "./AddItems";
import CollectionItem from "../components/CollectionItem";
import skeimg from "../assets/images/skeleton/image-1@2x.jpg";
import AdminOrders from "./AdminOrders";
import AdminCoupons from "./AdminCoupons";
import AddCoupon from "./AddCoupons";
import ModifyItems from "./ModifyItems";

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

  const resetItem = () => {
    setItem({
      name: "",
      price: 0,
      description: "",
      image: "",
      category: "",
      stock: 0,
    });
    setPreview(skeimg); // Reset the preview
  };

  return (
    <div className="admin-panel">
      <div className="admin-actions">
        <h1>Actions</h1>
        <div className="admin-buttons">
          <button onClick={() => setAction("additems")}>Add New Item</button>
          <button onClick={() => setAction("addcoupons")}>
            Add New Coupon
          </button>
          <button onClick={() => setAction("vieworders")}>View Orders</button>
          <button onClick={() => setAction("viewcoupons")}>View Coupons</button>
          <button onClick={() => setAction("modifystock")}>Modify Stock</button>
        </div>
      </div>
      <div className="admin-display">
        {action === "additems" && (
          <div className="additempnl">
            <div>
              <h1>Add New Item</h1>
              <AddItems item={item} setItem={setItem} resetItem={resetItem} />
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
        {action === "vieworders" && <AdminOrders />}
        {action === "viewcoupons" && <AdminCoupons />}
        {action === "addcoupons" && <AddCoupon />}
        {action === "modifystock" && <ModifyItems />}
      </div>
    </div>
  );
};

export default AdminPanel;
