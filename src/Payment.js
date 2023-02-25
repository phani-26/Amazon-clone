import React, { useState } from "react";
import { useStateValue } from "./StateProvider";
import "./Payment.css";
import { Link } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import {CardElement, useStripe, useElements, Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function Payment(){
    const [data, user]  = useStateValue();
    const basket = data.basket;
    const count = () =>{
        var sum=0;
        for(let i=0;i<basket.length;i++){
        sum+=basket[i].qty; console.log("Hey! man, "+basket[i]);
        }
       return sum;
    }
    var totalPrice = 0;
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

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = (e) => {
console.log(e);
    }
    const handleChange = (e) =>{
        setDisabled(e.empty);
        setError(e.error? e.error.message: "");
    }
    return(
        <div className="payment__container">
            <h2>CHECKOUT (
                 <Link to="/checkout" className="link">
                 {count()} 
                 </Link>
                 ) ITEMS</h2>
            
            <div className="payment__section">
                <div className="payment__title">
                <h2>Delivery Address</h2>
                </div>
                <div className="payment__address">
                    <p>user?.email</p>
                    <p>123 LA</p>
                    <p>Dorkwood street</p>
                </div>
            </div>
            <div className="payment__section">
                <div className="payment__title">
                <h2>Review items And DELIVERY</h2>
                </div>
                <div className="payment__items">
                    {items}
                </div>
            </div>
            <div className="payment__section">
                <div className="payment__title">
                    <h2>PAYMENT Method</h2>
                </div>
                <div>
                   <CardElement onChange={handleChange}/>
                </div>
            </div>
            
        </div>
    );
}

export default Payment;