import React from "react";
import "./Home.css";
import Product from "./Data/Product";
import products from "./Data/products";
import { CgMouse } from "react-icons/cg";

const Home = () => {
  const createProduct = (product) => {
    return (
      <Product
        url={product.images[0].url}
        name={product.name}
        price={product.price}
        id={product._id}
      />
    );
  };
  return (
    <>
      <div className="banner">
        <p>Welcome to SudoSu</p>
        <h1>Find Amazing Proucts Below</h1>
        <a href="#container">
          <button>
            Scroll
            <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products.map(createProduct)}
      </div>
    </>
  );
};
export default Home;
