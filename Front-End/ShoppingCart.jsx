import React from 'react';
import { useNavigate } from "react-router-dom";

function ShoppingCart({ cart, removeFromCart, increaseQty, decreaseQty }) {
  const navigate = useNavigate();
  return (
    
    <div className="mt-4">
      <h3>Shopping Cart</h3>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/checkout")}
      >
      Proceed to Checkout
      </button>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map(item => (
          <div 
            key={item.id} 
            className="d-flex justify-content-between align-items-center border p-3 mb-2"
          >
            <div>
              <h5>{item.task}</h5>
              <p>${item.price}</p>

              <div className="d-flex align-items-center gap-3">

                {item.quantity === 1 ? (
                  <span
                    onClick={() => removeFromCart(item.id)}
                    style={{ cursor: "pointer", fontSize: "20px" }}
                  >
                    🗑️
                  </span>
                ) : (
                  <span
                    onClick={() => decreaseQty(item.id)}
                    style={{ cursor: "pointer", fontSize: "20px" }}
                  >
                    ➖
                  </span>
                )}

                <span style={{ fontSize: "18px" }}>
                  {item.quantity || 1}
                </span>

                <span
                  onClick={() => increaseQty(item.id)}
                  style={{ cursor: "pointer", fontSize: "20px" }}
                >
                  ➕
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ShoppingCart;