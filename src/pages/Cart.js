import React, { useState, useEffect } from "react";
import { useCollectionContext } from "../hooks/useCollectionsContext";
import { useUserContext } from "../hooks/useUserContext";

const Cart = () => {
  const { cart, dispatch } = useCollectionContext();
  const { user } = useUserContext();

  // Always call hooks at the top level to avoid conditional issues
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [coupons, setCoupons] = useState([]);

  // Fetch coupons from the database on component load
  useEffect(() => {
    const fetchCoupons = async () => {
      if (!user) return; // Prevent fetch if user is not logged in
      try {
        const response = await fetch(
          "http://localhost:4000/api/products/coupons",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCoupons(data);
        } else {
          console.error("Failed to fetch coupons");
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
    
  }, [user]); // Effect depends on user object

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleApplyCoupon = () => {
    const matchedCoupon = coupons.find(
      (c) => c.code.toUpperCase() === coupon.toUpperCase()
    );

    if (matchedCoupon) {
      setDiscount(matchedCoupon.discount);
      alert(
        `Coupon applied! You get a ${matchedCoupon.discount * 100}% discount.`
      );
    } else {
      alert("Invalid coupon code. Please try again.");
      setDiscount(0);
    }
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderDetails = {
      items: cart.map((item) => ({
        id: item.itemid,
        title: item.title,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      total:
        cart.reduce(
          (total, item) => total + item.price * (item.quantity || 1),
          0
        ) *
        (1 - discount), // Apply discount
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/products/placed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
          body: JSON.stringify(orderDetails),
        }
      );

      if (response.ok) {
        dispatch({ type: "CLEAR_CART" });
        setDiscount(0);
        setCoupon("");
        alert("Order placed successfully!");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const discountedPrice = totalPrice * (1 - discount);

  if (!user) {
    return <p>Please log in to view your cart</p>; // Render something if no user
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <div>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.itemid} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                  <button onClick={() => handleRemoveFromCart(item.itemid)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h2>Total: ${discountedPrice.toFixed(2)}</h2>
          {discount > 0 && (
            <p className="discount-info">
              You saved ${(totalPrice * discount).toFixed(2)}!
            </p>
          )}
          <div className="coupon-section">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="coupon-input"
            />
            <button onClick={handleApplyCoupon} className="coupon-button">
              Apply Coupon
            </button>
          </div>
          <button className="order-button" onClick={handleOrder}>
            Make Order
          </button>
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );
};

export default Cart;
