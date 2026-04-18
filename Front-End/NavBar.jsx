import React from 'react';

function NavBar({ setSearch }) {
    return (
        <nav className="navbar navbar-dark bg-dark px-4">
            <h2 className="text-white">Amazon</h2>

            <input
                className="form-control w-50"
                type="text"
                placeholder="Search products..."
                onChange={(e) => setSearch(e.target.value)}
            />
        </nav>
    );
}

export default NavBar;