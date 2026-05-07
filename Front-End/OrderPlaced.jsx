import React from "react";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {

    const navigate = useNavigate();

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh", backgroundColor: "#f5f5f5" }}
        >
            <div
                className="bg-white p-5 rounded shadow text-center"
                style={{ width: "500px" }}
            >
                <h1 className="text-success mb-4">
                    ✓ Order Placed
                </h1>

                <p className="mb-4">
                    Thank you for your purchase.
                </p>

                <button
                    className="btn btn-warning"
                    onClick={() => navigate("/")}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}
export default OrderPlaced;