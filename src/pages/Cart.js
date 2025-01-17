import React, { useState, useEffect } from "react";
import { useCollectionContext } from "../hooks/useCollectionsContext";
import { useUserContext } from "../hooks/useUserContext";

const Cart = () => {
  const { cart, dispatch } = useCollectionContext();
  const { user } = useUserContext();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const discountedPrice = totalPrice * (1 - discount);

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleQuantityChange = (itemId, change) => {
    dispatch({
      type: "UPDATE_CART_ITEM",
      payload: {
        itemId,
        change,
      },
    });
  };

  const handleOrderSubmit = async () => {
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
        (1 - discount),
      address: specialInstructions, // Assuming specialInstructions is the address
    };

    try {
      const response = await fetch(
        "https://ecommerce-server-ten-phi.vercel.app/api/products/placed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
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

  if (!user) {
    return <p>Please log in to view your cart</p>;
  }

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      {cart.length > 0 ? (
        <div>
          <div className="cart-table">
            <div className="cart-header">
              <p>Product</p>
              <p className="extra-details">Price</p>
              <p>Quantity</p>
              <p className="extra-details">Total</p>
            </div>
            {cart.map((item) => (
              <div className="cart-row" key={item.itemid}>
                <div className="product-info">
                  <img src={item.image} alt={item.title} />
                  <div className="extra-details">
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
                <p className="extra-details">${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => handleQuantityChange(item.itemid, -1)}>
                    -
                  </button>
                  <button onClick={() => handleQuantityChange(item.itemid, 1)}>
                    +
                  </button>
                  <button
                    className="item-remove-btn"
                    onClick={() => handleRemoveFromCart(item.itemid)}
                  >
                    X
                  </button>
                </div>
                <p className="extra-details">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="special-instructions">
            <h3>Enter Address</h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Add your address here..."
            />
          </div>

          <div className="cart-summary">
            <p>Subtotal: ${totalPrice.toFixed(2)}</p>
            {discount > 0 && (
              <p>Discount: -${(totalPrice * discount).toFixed(2)}</p>
            )}
            <p>Total: ${discountedPrice.toFixed(2)}</p>
            <p>Taxes and shipping not included</p>
            <button onClick={handleOrderSubmit} disabled={specialInstructions}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );
};

export default Cart;
