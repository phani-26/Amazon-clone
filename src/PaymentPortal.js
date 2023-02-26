import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { StripeApiKey } from "./Constants";
import Payment from "./Payment";

const stripePromise = loadStripe(StripeApiKey)
export default function PaymentPortal(){
return(
<Elements stripe={stripePromise}>
    <Payment />
</Elements>
);
}