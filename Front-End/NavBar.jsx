import { useNavigate } from "react-router-dom";

function NavBar({ setSearch }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <h2 
        className="text-white"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Amazon
      </h2>

      <input
        className="form-control w-50"
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <button 
        className="btn btn-outline-light"
        onClick={() => navigate("/history")}
      >
        History
      </button>
    </nav>
  );
}

export default NavBar;