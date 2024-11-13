
import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({ items, cart, setCart }) => {
  
  const addToCart = (id, price, title, description, imgSrc) => {
    const itemExists = cart.some(item => item.id === id);
    
    if (itemExists) {
      toast.info('Item already in the cart', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      const obj = { id, price, title, description, imgSrc };
      setCart([...cart, obj]);
      toast.success('Your item has been added to the cart', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className="container my-5">
        <div className="row">
          {items.map((product) => (
            <div className="col-lg-4 col-md-6 my-3 text-center" key={product.id}>
              <Link to={`/product/${product.id}`} className="card" style={{ width: '18rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <img src={product.imgSrc} className="card-img-top" alt={product.title} />
                </div>
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <div className="card-text">{product.description}</div>
                <button className='btn btn-primary mx-3'> Rs{" "}{product.price}</button>
                <button 
                  onClick={() => addToCart(product.id, product.price, product.title, product.description, product.imgSrc)}
                  className='btn btn-warning'>Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
