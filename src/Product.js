import React from "react";
import "./Product.css";
import { actions } from "./Reducer";
import { useStateValue } from "./StateProvider";
import Noty from "noty";
import "noty/lib/noty.css"
import "noty/lib/themes/mint.css"
import { render } from "@testing-library/react";

function Product({ id, title, price, rating, url, qty }) {
  const [{ basket }, dispatch] = useStateValue();
  let rows = [];
  for (let i = 0; i < rating; i++) rows.push(<p>⭐</p>);
  console.log("hello ", basket);
  const addToBasket = () => {
    dispatch({
      type: actions.AddToBasket,
      item: {
        id: id,
        title: title,
        price: price,
        rating: rating,
        url: url,
        qty:1
      },
    });
   
    let n = new Noty({
      type:"success",
      layout:"topRight",
      text:`<div class="noty_container"><img src=${url} /> ${title} has been added to basket<div/>`,
      closeWith:["button", "click"],
      timeout:2000
    }).show();
  };
  return (
    <div className="product">
      <div className="product__info">
        <div>{title}</div>
        <div className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </div>
        <div className="product__rating">{rows}</div>
      </div>
      <div className="product__image">
        <img src={url} />
      </div>
      <button className="addBasket" onClick={addToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
