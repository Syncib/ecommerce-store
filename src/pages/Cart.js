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
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>
            {cart.map((item) => (
              <div className="cart-row" key={item.itemid}>
                <div className="product-info">
                 
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
                <p>${item.price.toFixed(2)}</p>
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
                <p>${(item.price * (item.quantity || 1)).toFixed(2)}</p>
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
            <button onClick={() => alert("Proceeding to checkout")}>
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
