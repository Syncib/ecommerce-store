import React, { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";

const AddCoupon = () => {
  const { user } = useUserContext();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    try {
      const response = await fetch(
        "https://ecommerce-server-ten-phi.vercel.app/api/admin/addcoupon",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ code, discount, expiry }),
        }
      );

      if (response.ok) {
        setSuccess("Coupon added successfully!");
        setCode("");
        setDiscount("");
        setExpiry("");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to add coupon.");
      }
    } catch (err) {
      setError("An error occurred while adding the coupon.");
    }
  };

  return (
    <div className="add-coupon">
      <h1>Add New Coupon</h1>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-coupon-form">
        <div className="form-group">
          <label htmlFor="code">Coupon Code</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="discount">Discount (%)</label>
          <input
            type="number"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
            min="1"
            max="100"
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiry">Expiry Date</label>
          <input
            type="date"
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Coupon</button>
      </form>
    </div>
  );
};

export default AddCoupon;
