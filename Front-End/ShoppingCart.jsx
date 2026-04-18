import React from 'react';

function ShoppingCart({ cart, removeFromCart }) {
    const total = cart.reduce((sum, item) => sum + (item.price || 20), 0);

    return (
        <div className="mt-5">
            <h2>Shopping Cart</h2>

            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <>
                    {cart.map((item, index) => (
                        <div key={index} className="border p-2 mb-2 d-flex justify-content-between">
                            <span>{item.task} - ${item.price || 20}</span>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => removeFromCart(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <h4>Total: ${total}</h4>
                </>
            )}
        </div>
    );
}

export default ShoppingCart;