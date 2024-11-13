import React ,{useState}from 'react';
import Navbar from './components/Navbar';
import Product from './components/Product';
import Productdetail from './components/Productdetail';
import Cart from './components/Cart';
import SearchItem from './components/SearchItem';
import { items } from './components/Data';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const App = () => {
  const [data, setData] = useState([...items])
  const [cart, setCart] = useState([])
  return (
    <>
      <Router>
        <Navbar cart={cart} setData={setData} />
        <Routes>
          <Route path="/" element={<Product cart={cart} setCart={setCart} items={data} />} />
          <Route path="/product/:id" element={<Productdetail  cart={cart} setCart={setCart}  />} />
          <Route path="/Search/:term" element={<SearchItem cart={cart} setCart={setCart}  />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
