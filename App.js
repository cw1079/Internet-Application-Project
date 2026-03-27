import React, { useState, useEffect } from 'react';

function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const API_URL = 'http://localhost:5001/todos';
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

// Fetch Todos (GET)
useEffect(() => {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => setTodos(data));
}, []);

// Add Todo (POST)
const addTodo = () => {
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, completed: false })
    })
    .then(res => res.json())
    .then(newTodo => setTodos([...todos, newTodo]));
};

// Delete Todo (DELETE)
const deleteTodo = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => setTodos(todos.filter(t => t.id !== id)));
};
const updateTodo = (id) =>{
    fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({task: editText})
    })
    .then(res =>res.json())
    .then(updated => {
        setTodos(todos.map(t => t.id === id ? updated : t));
        setEditingId(null);
    })
}

return (
    <div className="container mt-5">
        <h1 className="text-center mb-4">To-Do List</h1>

        {/* Input + Button */}
        <div className="input-group mb-3">
            <input
                className="form-control"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task..."
            />
            <button className="btn btn-primary" onClick={addTodo}>Add</button>
        </div>

        {/* Todo List */}
        <ul className="list-group">
            {todos.map(t => (
                <li key={t.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                    >
                    {editingId === t.id ? (
                        <div className="d-flex w-100 gap-2">
                            <input
                                className="form-control"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                            <button className="btn btn-success" onClick={() => updateTodo(t.id)}>Save</button>
                        </div>
                    ) : (
                        <>
                            <span>{t.task}</span>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        setEditingId(t.id);
                                        setEditText(t.task);
                                    }}
                                >Edit</button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteTodo(t.id)}
                                >Delete</button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    </div>
);
}
export default App;