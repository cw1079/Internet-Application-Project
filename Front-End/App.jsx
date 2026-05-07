import React, { useState, useEffect } from 'react';
import Card from './Card';
import NavBar from './NavBar';
import ShoppingCart from './ShoppingCart';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import History from "./History";
import ProductPage from "./ProductPage";
import Checkout from "./Checkout"
import OrderPlaced from './OrderPlaced';

function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState([]);
    const API_URL = 'http://localhost:5001/todos';

    useEffect(() => {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => setTodos(data));
    }, []);

    const [cartLoaded, setCartLoaded] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5001/cart")
            .then(res => res.json())
            .then(data => {
                setCart(data.items || []);
                setCartLoaded(true);
            });
    }, []);

    useEffect(() => {
        if (!cartLoaded) return;

        fetch("http://localhost:5001/cart", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: cart })
        });
    }, [cart, cartLoaded]);

    const addTodo = () => {
        if (!task.trim()) return;

        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task, price: Math.floor(Math.random() * 100) + 250 })
        })
        .then(res => res.json())
        .then(newTodo => {
            setTodos([...todos, newTodo]);
            setTask('');
        });
    };

    const deleteTodo = (id) => {
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            .then(() => setTodos(todos.filter(t => t.id !== id)));
    };

    const updateTodo = (id) => {
        fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: editText })
        })
        .then(res => res.json())
        .then(updated => {
            setTodos(todos.map(t => t.id === id ? updated : t));
            setEditingId(null);
        });
    };

    const addToCart = (item) => {
        const existing = cart.find(c => c.id === item.id);

        if (existing) {
            setCart(cart.map(c =>
                c.id === item.id
                    ? { ...c, quantity: c.quantity + 1 }: c
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const increaseQty = (id) => {
        setCart(cart.map(item =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }: item
        ));
    };

    const decreaseQty = (id) => {
        setCart(cart
            .map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }: item
            )
            .filter(item => item.quantity > 0)
        );
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const filteredTodos = todos.filter(t =>
        t.task.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Router>
            <NavBar setSearch={setSearch} />

            <Routes>

                <Route path="/" element={
                    <div className="container mt-4">

                        <div className="input-group mb-4">
                            <input
                                className="form-control"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                placeholder="Add a product..."
                            />
                            <button className="btn btn-warning" onClick={addTodo}>
                                Add Product
                            </button>
                        </div>
                            <h2 className="mb-4">Trending Items</h2>
                        <div className="row">
                            {filteredTodos.map(t => (
                                <div className="col-md-3" key={t.id}>
                                    <Card
                                        t={t}
                                        deleteTodo={deleteTodo}
                                        updateTodo={updateTodo}
                                        editingId={editingId}
                                        setEditingId={setEditingId}
                                        editText={editText}
                                        setEditText={setEditText}
                                        addToCart={addToCart}
                                    />
                                </div>
                            ))}
                        </div>

                        <ShoppingCart 
                            cart={cart} 
                            removeFromCart={removeFromCart}
                            increaseQty={increaseQty}
                            decreaseQty={decreaseQty}
                        />
                    </div>
                } />

                <Route path="/history" element={<History />} />
                <Route path="/checkout" element={<Checkout cart={cart} />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/orderplaced" element={<OrderPlaced />} />
            </Routes>
        </Router>
    );
}

export default App;