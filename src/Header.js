import React, { useEffect } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { SportsBasketball } from "@mui/icons-material";
import { useStateValue } from "./StateProvider";
import { auth, signOut } from "./firebase";
import { actions } from "./Reducer";
function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthentication = async () => {
    await signOut(auth);
  };
  let count =0;
  basket.forEach(element => {
    count+=element.qty;
  });
  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">
          <img
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            onError={({ currentTarget }) => {
              currentTarget.onError = false;
              currentTarget.src = require("./images/amazon_homepage_logo.png");
            }}
          />
        </div>
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchicon" />
      </div>
      <div className="header__nav">
        <div className="header__option">
          <Link to={!user &&"/login"} className="link">
            <div className="header__optionLineOne ">
              Hello {user ? user : "Guest"}
            </div>
            <div
              className="header__optionLineTwo "
              onClick={handleAuthentication}
            >
              {user ? "Sign Out" : "Sign in"}
            </div>
          </Link>
        </div>
        <Link to='/orders' className="link">
        <div className="header__option">
          <div className="header__optionLineOne">Returns</div>
          <div className="header__optionLineTwo">& Orders</div>
        </div>
        </Link>
        <div className="header__option">
          <div className="header__optionLineOne">Your</div>
          <div className="header__optionLineTwo">Prime</div>
        </div>
        <Link to="/checkout" className="link">
          <div className="header__option header__optionBasket">
            <ShoppingCartIcon className="header__optionLineOne" />
            <div className="header__optionLineTwo header__BasketCount">
              {count}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
