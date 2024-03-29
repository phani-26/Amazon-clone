import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actions } from "./Reducer";
import Payment from "./Payment";
import PaymentPortal from "./PaymentPortal";
import { DepartureBoard } from "@mui/icons-material";
import Orders from "./Orders";

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: actions.AddUser,
          user: authUser.email,
        });
      } else {
        dispatch({
          type: actions.RemoveUser,
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={
          <div>
            <Header />
            <Orders />
          </div>
          } />  
          <Route path="/payment" element={
          <div>
            <Header />
            <PaymentPortal />
          </div>
          } 
          />
          <Route
            path="/checkout"
            element={
              <div>
                <Header />
                <Checkout />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div>
                <Header />
                <Home />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
