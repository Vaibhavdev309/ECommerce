import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  //   size: window.innerWidth < 600 ? 20 : 25,
  value: 2.5,
  isHalf: true,
};

const Product = (props) => {
  return (
    <Link className="productCard" to={props._id}>
      <img src={props.url} alt={props.name} />
      <p>{props.name}</p>
      <div>
        <ReactStars {...options} />
        <span>(256 Reviews)</span>
      </div>
      <span>{props.price}</span>
    </Link>
  );
};

export default Product;
