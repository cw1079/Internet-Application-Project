import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/todos/${id}`)
      .then(res => res.json())
      .then(data => setItem(data));
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{item.task}</h2>
      <img src={item.image} alt={item.task} />
      <p>Price: ${item.price}</p>
      <p>Description: {item.Description}.</p>
    </div>
  );
}

export default ProductDetails;