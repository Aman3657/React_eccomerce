import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { items } from "./Data";
import Product from "./Product";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Productdetail = ({ cart, setCart }) => {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Filter the product based on the ID from URL params
    const selectedProduct = items.find(
      (product) => product.id === parseInt(id)
    ); // Using find instead of filter
    setProduct(selectedProduct);

    // Find related products based on category
    const relatedItems = items.filter(
      (product) => product.category === selectedProduct?.category
    );
    setRelatedProducts(relatedItems);
  }, [id]); // Depend only on `id`, so it runs only when the product ID changes

  const addToCart = (id, price, title, description, imgSrc) => {
    const itemExists = cart.some((item) => item.id === id);

    if (itemExists) {
      toast.info("Item already in the cart", {
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
      toast.success("Your item has been added to the cart", {
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
      <div className="container con">
        <div className="img">
          <img src={product.imgSrc} alt={product.title} />
        </div>

        <div className="text-center">
          <h1 className="card-title">{product.title}</h1>
          <div className="card-text">{product.description}</div>
          <button className="btn btn-primary mx-3">Rs {product.price}</button>
          <button
            onClick={() =>
              addToCart(
                product.id,
                product.price,
                product.title,
                product.description,
                product.imgSrc
              )
            }
            className="btn btn-warning"
          >
            Add To Cart
          </button>
        </div>
      </div>

      <h1 className="text-center my-5">Related Products</h1>
      <Product items={relatedProducts} cart={cart} setCart={setCart} />
    </>
  );
};

export default Productdetail;
