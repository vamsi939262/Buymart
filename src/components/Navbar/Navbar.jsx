import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import styles from "./Navbar.module.css";

const productData = [
  { id: 1, name: "iPhone 15 Pro" },
  { id: 2, name: "Samsung Galaxy S24" },
  { id: 3, name: "Sony Headphones" },
  { id: 4, name: "Apple Watch" },
  { id: 5, name: "MacBook Air" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Enhanced auth check with cleanup
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    
    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, [location]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    closeMenu();
    navigate("/");
    window.dispatchEvent(new Event('storage')); // Trigger storage event
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setFilteredProducts(
      productData.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
    ));
  };

  const handleResultClick = (product) => {
    setSearchQuery("");
    setFilteredProducts([]);
    navigate(`/product/${product.id}`);
  };

  const linkClass = ({ isActive }) => 
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logo} onClick={closeMenu}>
        <h2>BUY<span>MART</span></h2>
      </NavLink>

      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search products..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <div className={styles.searchDropdown}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={styles.searchResult}
                  onClick={() => handleResultClick(product)}
                >
                  {product.name}
                </div>
              ))
            ) : (
              <div className={styles.searchResult}>No results found</div>
            )}
          </div>
        )}
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        <li>
          <NavLink to="/" className={linkClass} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={linkClass} onClick={closeMenu}>
            <FaShoppingCart />
          </NavLink>
        </li>

        {!isLoggedIn ? (
          <li>
            <NavLink to="/login" className={linkClass} onClick={closeMenu}>
              Login
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/profile" className={linkClass} onClick={closeMenu}>
                <FaUserCircle size={20} />
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;