import React from "react";
import { actions } from "./Reducer";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, title, price, rating, url }) {
  let stars = [];
  for (let i = 0; i < rating; i++) stars.push(<p>⭐</p>);

  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: actions.RemoveFromBasket,
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
    <div className="checkoutProduct">
      <div className="checkout__image">
        <img src={url} />
      </div>
      <div className="product__info">
        <h2>{title}</h2>
        <div>
          <small>"$"</small>
          <strong>{price}</strong>
        </div>
        <div className="product__rating">{stars}</div>
        <button className="button" onClick={removeFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
