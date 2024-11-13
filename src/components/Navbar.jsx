import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { items } from "./Data";
import { FaBeer } from 'react-icons/fa'
import { BsFillCartCheckFill } from "react-icons/bs";


const Navbar = ({ setData,cart}) => {
  const location=useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  // Function to filter products by category
  const filterByCategory = (category) => {
    const filteredItems = items.filter(
      (product) => product.category === category
    );
    setData(filteredItems); // Update the data in the parent component
  };

  const filterByPrice = (price) => {
    const element = items.filter((product) => product.price >= price);
    setData(element);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      <header className="sticky-top">
        <div className="nav-bar">
          <Link to={"/"} className="brand">
            E-Cart
          </Link>

          <form onSubmit={handleSubmit} className="search-bar">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products"
            />
          </form>
          <Link to={"/cart"} className="cart">
            <button type="button" className="btn btn-primary position-relative">
            <BsFillCartCheckFill  style={{fontSize:'1.5rem'}}/>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
        </div>

        {location.pathname=='/' && (<div className="nav-bar-wrapper">
          <div className="items">Filter by {"->"}</div>
          <div className="items" onClick={() => setData(items)}>
            No Filter
          </div>
          <div onClick={() => filterByCategory("mobiles")} className="items">
            Mobiles
          </div>
          <div onClick={() => filterByCategory("laptops")} className="items">
            Laptops
          </div>
          <div onClick={() => filterByCategory("books")} className="items">
            Books
          </div>
          {/* Example filter items with prices */}
          <div onClick={() => filterByPrice(49999)} className="items">
            {">="} 49999
          </div>
          <div onClick={() => filterByPrice(69999)} className="items">
            {">="} 69999
          </div>
          <button>
            <div onClick={() => filterByPrice(89999)} className="items">
              {">="} 89999
            </div>
          </button>
        </div>)}

        {/* Filter options */}
        
      </header>
    </>
  );
};

export default Navbar;
