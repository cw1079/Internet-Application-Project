import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart }) {
    const navigate = useNavigate();
    const [ordered, setOrdered] = useState(false);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,0
    );
    
    if (ordered) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <div className="text-center">

                    <h1 className="text-success">
                        ✓ Order Placed
                    </h1>

                    <p className="mt-3">
                        Thank you for your purchase.
                    </p>

                    <button
                        className="btn btn-warning mt-3"
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">

            <div className="d-flex align-items-center mb-4">

                <button
                    className="btn btn-light me-3"
                    onClick={() => navigate("/")}
                >
                     ←
                </button>

            <h2 className="m-0">Checkout</h2>

        </div>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map(item => (
                        <div
                            key={item.id}
                            className="border p-3 mb-3 d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <h5>{item.task}</h5>
                                <p>Quantity: {item.quantity}</p>
                            </div>

                            <h5>
                                ${item.price * item.quantity}
                            </h5>
                        </div>
                    ))}

                    <h3 className="mt-4">
                        Total: ${total}
                    </h3>

                    <button
                        className="btn btn-success mt-3"
                        onClick={() => {

                            fetch("http://localhost:5001/history", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    id: Date.now(),
                                    items: cart,
                                    total: total
                                })
                            });

                            setOrdered(true);
                        }}
                    >
                         Place Order
                    </button>
                </>
            )}
        </div>
    );
}

export default Checkout;