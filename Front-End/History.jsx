import React, { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/history")
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Order History</h2>

      {history.map(order => (
    <div
        key={order.id}
        className="border p-3 mb-3"
    >

        <h5>Order Total: ${order.total}</h5>

        {order.items.map(item => (
            <div key={item.id}>
                {item.task} x {item.quantity}
            </div>
        ))}

    </div>
))}
    </div>

    
  );
}

export default History;