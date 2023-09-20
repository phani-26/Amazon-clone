import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import "./Payment.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import {CardElement, useStripe, useElements, Elements} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import { actions } from "./Reducer";
import { act } from "react-dom/test-utils";


function Payment(){
    const [data, dispatch]  = useStateValue();
    const user =data.user;
    const basket = data.basket;
    const count = () =>{
        var sum=0;
        for(let i=0;i<basket.length;i++){
        sum+=basket[i].qty; //console.log("Hey! man, "+basket[i]);
        }
       return sum;
    }
    const calculatePrice = (bas) => {
        var totalP =0;
        for (let i = 0; i < bas.length; i++) {
            totalP += parseFloat(bas[i].price)*bas[i].qty;
        return totalP;
    }
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
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const navigate= useNavigate();

    useEffect(() =>{
       const getClientSecretKey= async () => {
        const response = await axios (
        {
            method:"GET",
            // stripe expects total currency in sub units
            url:`https://zany-disco-75jrjgvv7vg3xrrq-5001.app.github.dev/clone-5be04/us-central1/api/create/payment?totalPrice=${calculatePrice(data.basket)*100}`
        });
        console.log("secret: ",response.data.client_secret)
        setClientSecret(response.data.client_secret);
       

    };
    getClientSecretKey();

    },[data.basket]);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setProcessing(true);
      console.log("secret1 : ",clientSecret);
      const result = await stripe.confirmCardPayment( clientSecret, {
        payment_method:{
          card: elements.getElement(CardElement)
        } 
    }).then(function(results){
        console.log("results: ",results);
        console.log("PaymentIntent: ",results.paymentIntent);
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
             type: actions.EmptyBasket
        })
        navigate("/");
    });
    

    }
    const handleChange = (e) =>{
        //if no value is present in card
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
                    <p>{user?.email}</p>
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
                <div className="payment__card">
                   <CardElement onChange={handleChange}/>

                   <div className="payment__price_container">
                    <CurrencyFormat
                    renderText={(val) =>{
                        return <h3> Order Total: {val} </h3>
                    }}
                     decimalScale={2}
                     thousandSeparator={true}
                     value={totalPrice}
                     displayType={"text"}
                     prefix={"$"}

                    />
                    <button className="payment__buyButton"
                    disabled={disabled || processing || succeeded}
                    onClick={handleSubmit}>
                        Buy Now</button>
                   </div>
                </div>
            </div>
            
        </div>
    );
}

export default Payment;