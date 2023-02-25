import React from "react";
import CurrencyFormat from "react-currency-format";
import "./Checkout.css";
import { useStateValue } from "./StateProvider";
import "./CheckoutProduct.css";
import CheckoutProduct from "./CheckoutProduct";
import Payment from "./Payment";
import FlipMove from "react-flip-move";
import { Link } from "react-router-dom";
function Checkout() {
  let [{ user, basket }, dispatch] = useStateValue();
  console.log("user and basket ", user, basket);
  let totalPrice = 0;
  const items = [];
  for (let i = 0; i < basket.length; i++) {
    totalPrice += parseFloat(basket[i].price)*basket[i].qty;
    items.push(
      <CheckoutProduct
        key={basket[i].id}
        id={basket[i].id}
        title={basket[i].title}
        price={basket[i].price}
        rating={basket[i].rating}
        url={basket[i].url}
        qty={basket[i].qty}
      />
    );
  }
  
  let count =0;
  basket.forEach(element => {
    count+=element.qty;
  });

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <h2 className="checkout__title">
          {" "}
          Hello {user != null ? user.email : "Guest"} &nbsp; Your Shopping Cart
        </h2>
        <div className="products__cart"><FlipMove>{items}</FlipMove></div>
      </div>
      <div className="checkout__right">
        <p> 
          Subtotal {"("} {count} {")"} items :
          <strong>
            <CurrencyFormat
              decimalScale={2}
              thousandSeparator={true}
              value={totalPrice}
              displayType={"text"}
              prefix={"$"}
            />
          </strong>
        </p>
        <div className="gift">
          <input type={"checkbox"} />
          This order contains a gift
        </div>
        <Link className="link" to="/payment"><button className="checkout__button">Proceed to Checkout</button></Link>
      </div>
    </div>
  );
}

export default Checkout;
