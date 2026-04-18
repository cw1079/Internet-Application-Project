import React from 'react';
import productImg from "./logo.svg";

function Card({t, deleteTodo, updateTodo, editingId, setEditingId, editText, setEditText, addToCart
}) {
    return (
        <div className="card mb-4 shadow-sm">
            <img
                src={productImg}
                className="card-img-top"
                alt="product"
            />

            <div className="card-body">
                {editingId === t.id ? (
                    <>
                        <input
                            className="form-control mb-2"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                        />
                        <button
                            className="btn btn-success btn-sm"
                            onClick={() => updateTodo(t.id)}
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <h5>{t.task}</h5>
                        <p>${t.price || 20}</p>
                    </>
                )}

                <div className="d-flex justify-content-between mt-3">
                    <button
                        className="btn btn-warning btn-sm"
                        onClick={() => {
                            setEditingId(t.id);
                            setEditText(t.task);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTodo(t.id)}
                    >
                        Delete
                    </button>
                </div>
                <button
                    className="btn btn-primary w-100 mt-2"
                    onClick={() => addToCart(t)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default Card;