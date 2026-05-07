function SearchBar({ setSearch }) {
    return (
        <input
            type="text"
            className="form-control w-50"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}

export default SearchBar;