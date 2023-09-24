import { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import {db} from "./firebase";
import { getDoc, getDocs, doc,collection } from "firebase/firestore";
import "./Orders.css"
import Order from "./Order";

function Orders(){
    const [{user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState(null);
    console.log("orders type is ", orders);
    console.log("user", user);
    useEffect(() => { console.log("useEffect");
        const fun = async() => {
          const d= await getDocs(collection(db, "users", user, "orders"));
        console.log(" data is ", d);
        const temp = [];
        d.forEach(doc => {
          console.log(doc.data());
          console.log(doc.id);
          temp.push(
            {
              id:doc.id,
              created: doc.data().created,
              amount: doc.data().amount, 
              basket: doc.data().basket
            }
            );
      })
       setOrders(temp); //list of all orders,
        };
        fun(); 
    }, []);
  if(orders== null)return null;

       return(
    <div className="orders">
        <h2 style={{padding:"10px"}}>Your orders</h2>
    
       {
       orders?.map((order, index) =>{
          return <Order doc= {order}/>;
       })}
       
     </div>
    );
    
}
export default Orders;