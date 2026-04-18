import React, { useState, useEffect } from 'react';
import Card from './Card';
import NavBar from './NavBar';
import ShoppingCart from './ShoppingCart';

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

    
    const addTodo = () => {
        if (!task.trim()) return;

        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task, price: Math.floor(Math.random() * 100) + 10 })
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
        setCart([...cart, item]);
    };

    const removeFromCart = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    
    const filteredTodos = todos.filter(t =>
        t.task.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <NavBar setSearch={setSearch} />

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

                {/* CART */}
                <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
            </div>
        </div>
    );
}

export default App;