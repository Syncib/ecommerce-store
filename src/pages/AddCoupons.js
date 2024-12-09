import React, { useState } from "react";

const AddCoupon = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCoupon = async () => {
    if (!code || !discount) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // Admin authentication
        },
        body: JSON.stringify({ code, discount: parseFloat(discount) }),
      });

      if (response.ok) {
        setMessage("Coupon added successfully!");
        setCode("");
        setDiscount("");
      } else {
        setMessage("Failed to add coupon. Please try again.");
      }
    } catch (error) {
      console.error("Error adding coupon:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="add-coupon-page">
      <h1>Add New Coupon</h1>
      <div className="form-group">
        <label>Coupon Code:</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter coupon code"
        />
      </div>
      <div className="form-group">
        <label>Discount (in decimal, e.g., 0.1 for 10%):</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Enter discount value"
        />
      </div>
      <button onClick={handleAddCoupon} className="add-coupon-button">
        Add Coupon
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddCoupon;
