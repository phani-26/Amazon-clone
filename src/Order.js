import moment from "moment/moment";
import CheckoutProduct from "./CheckoutProduct";
import "./Order.css"

function Order({doc}){
  console.log("doc is ", doc);

return(
    <div className="order">
    <p style={{textAlign: 'left'}}><strong>OrderId:</strong> <small>{ doc.id}</small>
    <span style={{float:'right'}}><strong>Created:</strong> <small>{ moment.unix(doc.created).format('MMMM Do YYYY, h:mm')}</small></span>
    </p>
    { doc.basket.map((basket, index) => {
     return <CheckoutProduct
        key={basket.id}
        id={basket.id}
        title={basket.title}
        price={basket.price}
        rating={basket.rating}
        url={basket.url}
        qty={basket.qty}
        hideEdit={true}
      />
    })}
    <p style={{textAlign:'right'}}><strong>Total amount:</strong> <small>{ doc.amount}</small></p>
    </div>
);
}

export default Order;