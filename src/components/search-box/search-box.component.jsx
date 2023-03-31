import "./search-box.styles.css";

const SearchBox = ({ className, placeholder, onSearchHandler }) => (
  <div>
    <input
      className={`search-box ${className}`}
      type="search"
      placeholder={placeholder}
      onChange={onSearchHandler}
    />
  </div>
);

export default SearchBox;
