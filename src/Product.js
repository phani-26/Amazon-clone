import React from "react";
import "./Product.css";
import { actions } from "./Reducer";
import { useStateValue } from "./StateProvider";

function Product({ id, title, price, rating, url }) {
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
      },
    });
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
