import React, { forwardRef } from "react";
import { actions } from "./Reducer";
import { useStateValue } from "./StateProvider";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

// forward ref is used for react flip which needs ref (reference) to work, forwardRef accepts a
// arrow function, in which ref is the reference 

const CheckoutProduct = forwardRef(({ key, id, title, price, rating, url, qty }, ref) => {
  let stars = [];
  for (let i = 0; i < rating; i++) stars.push(<p>⭐</p>);

  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: actions.RemoveFromBasket,
      item: {
        key: key,
        id: id,
        title: title,
        price: price,
        rating: rating,
        url: url,
        qty:qty
      },
    });
  };

  const reduceQuantity = ()=>{
    dispatch({
      type:actions.ReduceQuantityBy1,
      item:{
        id:id,
        title:title,
        price:price,
        rating:rating,
        url:url,
        qty:qty
      }
    })
  };

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
  }

  return (
    <div ref = {ref} className="checkoutProduct">
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
        <div className="product__quantity">
        {qty===1? <DeleteIcon className="remove__qty" onClick={reduceQuantity}/> : <RemoveIcon className="remove__qty" onClick={reduceQuantity}/>}
        <div className="actual__qty">{qty}</div>
        <AddIcon className="add__qty" onClick={addToBasket}/>
        </div>
        <button className="button" onClick={removeFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
  });

export default CheckoutProduct;
